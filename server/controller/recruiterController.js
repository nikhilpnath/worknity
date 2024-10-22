import Recruiters from "../models/recruiterModel.js";
import { generateAuthToken } from "../utils/auth.js";

export const recruiterRegister = async (req, res, next) => {
  const { companyName, email, password } = req.body;

  try {
    const userExists = await Recruiters.findOne({ email });
    if (userExists) {
      throw new Error("Email Already In Use");
    }
    const recruiter = new Recruiters({
      name: companyName,
      email,
      password,
      accountType: "company",
    });
    await recruiter.save();

    const recruiterRegToken = generateAuthToken(recruiter._id, "company");

    res.status(200).json({
      success: true,
      message: "Account Created Succcessfully",
      user: {
        id: recruiter._id,
        name: recruiter.name,
        email: recruiter.email,
        accountType: recruiter.accountType,
      },
      token: recruiterRegToken,
    });
  } catch (err) {
    next(err); //passing the error to the error handler middlware which we created
  }
};

export const recruiterLogin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const recruiter = await Recruiters.findByCredentials(email, password);

    const recruiterLogToken = generateAuthToken(recruiter._id, "company");

    res.status(200).json({
      success: true,
      message: "Logined Successfully",
      user: {
        id: recruiter._id,
        name: recruiter.name,
        email: recruiter.email,
        accountType: recruiter.accountType,
      },
      token: recruiterLogToken,
    });
  } catch (err) {
    next(err);
  }
};

export const updateCompanyProfile = async (req, res, next) => {
  const { name, contact, location, profileUrl, about } = req.body;

  try {
    const id = req.user._id; //jwt decoded

    const updatedCompany = {
      name,
      contact,
      location,
      profileUrl,
      about,
    };

    const company = await Recruiters.findByIdAndUpdate(id, updatedCompany, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Company Profile Updated SUccessfully",
      company: company,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const getCompanyProfile = async (req, res, next) => {
  try {    
    res.status(200).json({
      success: true,
      data: req.user,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//GET ALL COMPANIES
export const getCompanies = async (req, res, next) => {
  try {
    const { search, sort, location } = req.query;

    //conditons for searching filters
    const queryObject = {};

    if (search) {
      queryObject.name = { $regex: search, $options: "i" };
    }

    if (location) {
      queryObject.location = { $regex: location, $options: "i" };
    }

    let queryResult = Recruiters.find(queryObject).select("-password");

    // SORTING
    if (sort === "Newest") {
      queryResult = queryResult.sort("-createdAt");
    }
    if (sort === "Oldest") {
      queryResult = queryResult.sort("createdAt");
    }
    if (sort === "A-Z") {
      queryResult = queryResult.sort("-name");
    }
    if (sort === "Z-A") {
      queryResult = queryResult.sort("name");
    }

    // pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    // records count
    const total = await Recruiters.countDocuments(queryResult);
    const numOfPage = Math.ceil(total / limit);

    // show more companies
    queryResult = queryResult.limit(limit * page);

    const companies = await queryResult;

    res.status(200).json({
      success: true,
      total,
      companies: companies,
      page,
      numOfPage,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

//GET  COMPANY JOBS
export const getCompanyJobListing = async (req, res, next) => {
  const { search, sort } = req.query;
  const id = req.user._id;

  try {
    //conditons for searching filters
    const queryObject = {};

    if (search) {
      queryObject.location = { $regex: search, $options: "i" };
    }

    let sorting;
    //sorting || another way
    if (sort === "Newest") {
      sorting = "-createdAt";
    }
    if (sort === "Oldest") {
      sorting = "createdAt";
    }
    if (sort === "A-Z") {
      sorting = "name";
    }
    if (sort === "Z-A") {
      sorting = "-name";
    }

    let queryResult = await Recruiters.findById({ _id: id }).populate({
      path: "jobPosts",
      options: { sort: sorting },
    });
    const companies = await queryResult;

    res.status(200).json({
      success: true,
      companies: companies,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

// GET SINGLE COMPANY by id
export const getCompanyById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const company = await Recruiters.findById({ _id: id }).populate({
      path: "jobPosts",
      select: "_id detail jobTitle jobType location createdAt",
      options: {
        sort: "-_id",
      },
    });

    const data = {
      name:company.name,
      email:company.email,
      jobPosts:company.jobPosts,
      about:company.about,
      contact:company.contact,
      location:company.location,
      profileUrl:company.profileUrl
    }

  
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
