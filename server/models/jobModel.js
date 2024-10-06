import mongoose from "mongoose";
import Recruiters from "./recruiterModel.js";

const jobSchema = new mongoose.Schema(
  {
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Recruiters" },
    jobTitle: { type: String },
    jobType: { type: String },
    location: { type: String },
    salary: { type: String },
    vacancies: { type: Number },
    experience: { type: String },
    detail: { description: { type: String }, requirements: { type: String } },
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Seekers" }],
  },
  { timestamps: true }
);

//deleting job if from compnay jobposts array
jobSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      const job = this;
      const companyId = job.company;

      const company = await Recruiters.findById(companyId);

      if (company) {
        const indexToRemove = company.jobPosts.indexOf(job._id);
        if (indexToRemove !== -1) {
          company.jobPosts.splice(indexToRemove, 1);
          await company.save();
        }
      }
      next();
    } catch (error) {
      next(error);
    }
  }
);

const Jobs = mongoose.model("Jobs", jobSchema);

export default Jobs;
