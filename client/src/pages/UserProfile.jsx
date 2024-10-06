import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiLocationMarker } from "react-icons/hi";
import { AiOutlineMail } from "react-icons/ai";
import { FiPhoneCall } from "react-icons/fi";
import { NoProfile } from "../assets";
import { UserForm } from "../components";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiRequest } from "../utils";
import { toast } from "react-toastify";
import { logout } from "../redux/userSlice";
import { seekerData } from "../redux/seekerSlice";

const UserProfile = () => {
  const { user } = useSelector((state) => state.user);
  const { seekerInfo } = useSelector((state) => state.seeker);

  const {id} = useParams();

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const getUserData = async()=>{

    const result = await apiRequest({
      url:`/user/get-user-profile/${id}`,
      token:user.token,
      method:'GET'
    })


    if(result.status === 200) {
      dispatch(seekerData(result.data.user))
    }
    else{
      console.log(result)
      toast.error("Something Went Wrong")
    }
  }

  useEffect(()=>{
    id && getUserData();
  },[id])

  const deleteAccount = async()=>{


  if( window.confirm("Do you want to delete your account? ")){

    const result= await apiRequest({
      url:"/user/delete-user",
      token:user.token,
      method:"DELETE"
    })
    console.log(result)

    if(result.status === 200){
      toast.success(result.data.message)
      dispatch(logout())
      navigate('/user-auth')
    }
    else{
      toast.error("Something Went Wrong")
    }
  }

  }

  return (
    <div className="container mx-auto flex items-center justify-center py-10">
      <div className="w-full md:w-2/3 2xl:w-2/4 bg-white shadow-lg p-10 pb-10 rounded-lg">
        <div className="flex flex-col items-center justify-center mb-4">
          <h1 className="text-4xl font-semibold text-slate-600 capitalize">
            {seekerInfo?.name ?? user.name}
          </h1>

          <h5 className="text-blue-700 text-base font-bold">
            {seekerInfo?.headLine || "No Head Line"}
          </h5>

          <div className="w-full flex flex-wrap lg:flex-row justify-between mt-8 text-sm">
            <p className="flex gap-1 items-center justify-center  px-3 py-1 text-slate-600 rounded-full">
              <HiLocationMarker /> {seekerInfo?.location ?? "No Location"}
            </p>
            <p className="flex gap-1 items-center justify-center  px-3 py-1 text-slate-600 rounded-full">
              <AiOutlineMail /> {seekerInfo?.email ?? user?.email}
            </p>
            <p className="flex gap-1 items-center justify-center  px-3 py-1 text-slate-600 rounded-full">
              <FiPhoneCall /> {seekerInfo?.contact ?? "No Contact"}
            </p>
            {seekerInfo?.resumeUrl && (
              <Link to={seekerInfo?.resumeUrl} target="_blank" >
                <p className="text-blue-700 py-1">Resume</p>
              </Link>
            )}
          </div>
        </div>

        <hr />

        <div className="w-full py-3">
          <div className="w-full flex flex-col-reverse items-center md:flex-row gap-8 py-6">
            <div className="w-full md:w-2/3 flex flex-col gap-4 text-lg text-slate-600 mt-20 md:mt-0">
              <p className="text-[#0536e7]  font-semibold text-2xl">ABOUT</p>
              <span className="text-base text-justify break-all">
                {seekerInfo?.about ?? "No About Found"}
              </span>
            </div>

            <div className="w-full md:w-1/3 h-44">
              <img
                src={seekerInfo?.profileUrl ?? NoProfile}
                alt={seekerInfo?.name ?? user?.name}
                className="w-full h-48 object-contain rounded-lg"
              />
            </div>

           
          </div>

          {user.accountType === "seeker" ? (
              <div className="w-full sm:flex justify-around ">
                <button
                  className="w-full sm:w-1/4  bg-blue-600 text-white mt-4 py-2 rounded"
                  onClick={() => setOpen(true)}
                >
                  Edit Profile
                </button>

                <button
                  className="w-full sm:w-1/4 bg-red-600 text-white mt-4 py-2 rounded"
                  onClick={deleteAccount}
                >
                 Delete Account
                </button>
              </div>
            ):
            <div className="flex justify-start">
              <button className=" bg-blue-600 p-2 rounded text-white"
               onClick={()=>window.location.href=`mailto:${seekerInfo?.email}`}
               >Contact</button>
            </div>
            }
        </div>
      </div>

      <UserForm open={open} setOpen={setOpen} />
    </div>
  );
};

export default UserProfile;
