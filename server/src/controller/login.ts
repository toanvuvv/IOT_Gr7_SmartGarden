import { user } from "../config/connectDB";
import { Request, Response } from "express";

declare module "express-session" {
  export interface SessionData {
    user: { [key: string]: any }; // Add a user property to SessionData
  }
}

// import jwt from "jsonwebtoken";
export const createUser = async (req: Request, res: Response) => {
  const { username, password, gmail } = req.body;
  try {
    const entry = user.doc();
    const peopleObject = {
      id: entry.id,
      username,
      password,
      gmail,
    };
    const querySnapshot = await user
      .where("gmail", "==", peopleObject.gmail)
      .get();
    if (querySnapshot.size != 0) {
      res
        .status(400)
        .send(
          "Account's gmail already exits, please change different username !"
        );
    } else {
      await entry.set(peopleObject);
      res.status(200).send({
        status: "success",
        message: "Account added, register successfully !",
      });
    }
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};

export const findUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const doc = await user.doc(id).get();

    if (!doc.exists) {
      res.status(404).send("User not found");
    } else {
      res.status(200).send(doc.data());
    }
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};

export const login = async (req: Request, res: Response) => {
  const gmail: string = req.body.gmail;
  const password: string = req.body.password;
  let all_match: any;

  user
    .where("gmail", "==", gmail)
    .where("password", "==", password)
    .get()
    .then((querySnapshot: any) => {
      querySnapshot.forEach((doc: any) => {
        all_match = doc.data();
      });
      if (querySnapshot.size != 0) {
        res.status(200).send({
          status: "success",
          message: "Login successfully !",
          payload: {
            username: all_match.username,
            id: all_match.id,
          },
        });
      } else {
        res.send("Account not exist, please register or login again !");
        console.log("Login fail !");
      }
    })
    .catch((error: any) => {
      console.log("Error getting documents: ", error);
      res.status(500).send(error);
    });
};
