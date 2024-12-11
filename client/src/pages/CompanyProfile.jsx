import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { HiLocationMarker } from "react-icons/hi";
import { AiOutlineMail } from "react-icons/ai";
import { FiPhoneCall, FiEdit3 } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { CustomButton, JobCard, CompanyForm, Meta } from "../components";

import { useDispatch, useSelector } from "react-redux";
import { apiRequest } from "../utils";
import { cmpData } from "../redux/companySlice";

const CompanyProfile = () => {
  const { user } = useSelector((state) => state.user);

  const { companyInfo } = useSelector((state) => state.cmp);

  const [openForm, setOpenForm] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const fetchCompanyById = async () => {
    const result = await apiRequest({
      url: `/companies/get-company/${id}`,
      method: "GET",
      token: user.token,
    });

    if (result.status === 200) {
      dispatch(cmpData(result.data.data));
    } else {
      console.log(result);
      // alert(result.error)
      toast.error("Error Occured");
    }
  };

  useEffect(() => {
    id && fetchCompanyById();
  }, [id]);


  return (
    <div className="container mx-auto p-5">
      <Meta
        userTitle={`${companyInfo?.name ?? "Explore"} | Worknity`}
        userDescption="Discover company profiles on Worknity. Explore potential employers, learn about their culture, and find the perfect job match for your career."
        cmpTitle="Manage Your Profile | Worknity"
        cmpDescription="Create and manage your company profile on Worknity. Showcase your brand, post job openings, and connect with qualified candidates to build your ideal team."
        userUrl={`https://worknity.netlify.app/company-profile/${id}`}
        cmpUrl={`https://worknity.netlify.app/company-profile`}
      />
      <div>
        <div className="w-full flex flex-col md:flex-row gap-3 justify-between">
          <h2 className="text-gray-600 text-xl font-semibold">
            {user?.accountType === "company" ? (
              <>Welcome, {companyInfo?.name ?? user.name}</>
            ) : (
              <>{companyInfo?.name}</>
            )}
          </h2>

          {user?.accountType !== "seeker" && (id ? id === user.id : !id) && (
            <div className="flex items-center justifu-center py-5 md:py-0 gap-4">
              <CustomButton
                onClick={() => setOpenForm(true)}
                iconRight={<FiEdit3 />}
                containerStyles={`py-1.5 px-3 md:px-5 focus:outline-none bg-blue-600  hover:bg-blue-700 text-white rounded text-sm md:text-base border border-blue-600`}
              />

              <Link to="/upload-job">
                <CustomButton
                  title="Upload Job"
                  containerStyles={`text-blue-600 py-1.5 px-3 md:px-5 focus:outline-none  rounded text-sm md:text-base border border-blue-600`}
                />
              </Link>
            </div>
          )}
        </div>

        <div className="w-full flex flex-col md:flex-row justify-start md:justify-between mt-4 md:mt-8 text-base">
          <p className="flex gap-1 items-center   px-3 py-1 text-slate-600 ">
            <HiLocationMarker /> {companyInfo?.location ?? "No Location"}
          </p>
          <p className="flex gap-1 items-center   px-3 py-1 text-slate-600 ">
            <AiOutlineMail /> {companyInfo?.email ?? user.email}
          </p>
          <p className="flex gap-1 items-center  px-3 py-1 text-slate-600">
            <FiPhoneCall /> {companyInfo?.contact ?? "No Contact"}
          </p>

          <div className="flex flex-col items-center mt-3.5 md:mt-0">
            <span className="text-xl">{companyInfo?.jobPosts?.length}</span>
            <p className="text-blue-600 ">Job Post</p>
          </div>
        </div>

        {companyInfo?.about && (
          <div>
            <p className="text-base text-slate-600 bg-[#f5f5dc] py-2.5 px-5 my-3.5 md:mx-auto w-full  md:w-8/12 text-justify break-all border-dashed border-2  rounded-xl">
              {companyInfo?.about}
            </p>
          </div>
        )}
      </div>

      {/* no job opennings */}
      {user?.accountType === "seeker" && companyInfo?.jobPosts.length === 0 ? (
        <div className="text-center mt-11">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#b38787] capitalize">
            Thank you for your interest
          </h1>
          <p className="text-gray-500 my-2">
            But there are no job openings available at this time. Please check
            back at another time
          </p>
          <button
            onClick={() => navigate("/companies")}
            className="bg-[#b38787] text-white py-2 px-3 rounded"
          >
            Back to Companies
          </button>
        </div>
      ) : (
        <div className="w-full mt-20 flex flex-col gap-2">
          <p className="text-center sm:text-left"> Jobs Posted</p>
          <div className="flex flex-wrap justify-center sm:justify-normal gap-6">
            {companyInfo?.jobPosts?.map((job) => {
              const data = {
                name: companyInfo?.name,
                email: companyInfo?.email,
                logo: companyInfo?.profileUrl,
                ...job,
              };
              return <JobCard data={data} key={job._id} />;
            })}
          </div>
        </div>
      )}

      <CompanyForm open={openForm} setOpen={setOpenForm} />
    </div>
  );
};

export default CompanyProfile;
