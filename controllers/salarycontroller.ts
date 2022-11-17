import { Op } from "sequelize";
import Salary from "../models/salaryData";
import { sign } from "jsonwebtoken";
export const createSalary = async (req: any, res: any): Promise<any> => {
  try {
    const SalaryDetail = await Salary.bulkCreate(req.body);
    console.log(SalaryDetail);
    return res.status(200).json({
      message: "Salary Created Successfully",
    });
  } catch (e) {
    return res.status(400).json({ message: e });
  }
};

export const GetSalaries = async (req: any, res: any) => {
  try {
    let SalaryData;
    console.log(Object.keys(req.body).length);
    if (Object.keys(req.body).length == 0) {
      SalaryData = await Salary.findAll({ limit: 40 });
    } else {
      if (req.body.filter && req.body.order) {
        SalaryData = await Salary.findAll({
          where: {
            gender: req.body.filter,
          },
          order: [["first_name", req.body.order]],
          limit: 40,
        });
      } else {
        SalaryData = await Salary.findAll({
          order: [["first_name", req.body.order]],
          limit: 40,
        });
      }
    }
    return res
      .status(200)
      .json({ message: "Salary Fetched", data: SalaryData });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "Something Went Wrong" });
  }
};
