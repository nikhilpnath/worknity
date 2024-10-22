import Seekers from "../models/seekerModel.js";
import Jobs from "../models/jobModel.js";
import { generateAuthToken } from "../utils/auth.js";

export const seekerRegister = async (req, res, next) => {
  const { seekerName, email, password } = req.body;
  try {
    const userExists = await Seekers.findOne({ email });

    if (userExists) {
      throw new Error("Email Already Exists");
    }

    const seeker = new Seekers({
      name: seekerName,
      email,
      password,
    });

    await seeker.save();

    const seekerRegToken = generateAuthToken(seeker._id, "seeker");

    res.status(200).json({
      success: true,
      message: "Account Created Succcessfully",
      user: {
        id: seeker._id,
        name: seeker.name,
        email: seeker.email,
        accountType: seeker.accountType,
      },
      token: seekerRegToken,
    });
  } catch (err) {
    next(err); //passing the error to the error handler middlware which we created
  }
};

export const seekerLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const seeker = await Seekers.findByCredentials(email, password);

    const seekerLogToken = generateAuthToken(seeker._id, "seeker");
    res.status(200).json({
      success: true,
      message: "Logined Successfully",
      user: {
        id: seeker._id,
        name: seeker.name,
        email: seeker.email,
        accountType: seeker.accountType,
      },
      token: seekerLogToken,
    });
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  const {
    name,
    email,
    contact,
    location,
    profileUrl,
    resumeUrl,
    headLine,
    about,
  } = req.body;

  try {
    const id = req.user._id;

    const updatedUser = {
      name,
      email,
      contact,
      location,
      profileUrl,
      resumeUrl,
      headLine,
      about,
    };

    const user = await Seekers.findByIdAndUpdate(id, updatedUser, {
      new: true,
    });

    res.status(200).json({
      sucess: true,
      message: "User updated successfully",
      user: user,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

// getting user info

export const getUser = async (req, res, next) => {
  try {
    const userData = {
      name: req.user.name,
      email: req.user.email,
      about: req.user.about,
      contact: req.user.contact,
      headLine: req.user.headLine,
      location: req.user.location,
      profileUrl: req.user.profileUrl,
      resumeUrl: req.user.resumeUrl,
    };

    console.log(userData);
    

    res.status(200).json({
      success: true,
      user: userData,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

//getting user Data using id
export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await Seekers.findById({ _id: id });

    if (!user) {
      throw new Error("User Not Found");
    }

    res.status(200).json({
      success: true,
      user: user,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const applyJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;

    const id = req.user._id;

    //pushing the user id to the applicants array and updating the record
    const job = await Jobs.findById(jobId);

    job.applicants.push(id);

    await Jobs.findByIdAndUpdate(jobId, job, {
      new: true,
    });

    res.status(200).json({
      message: "Applied Successfully",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await req.user.deleteOne();

    res.status(200).json({
      success: true,
      message: "Successfully Deleted",
    });
  } catch (err) {
    next(err);
  }
};
