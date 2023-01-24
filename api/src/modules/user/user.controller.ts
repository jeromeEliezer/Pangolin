import { RequestHandler } from "express";
import bcrypt from "bcrypt";

import { logcatch } from "../../utils/logger";
import User from "./user.model";
import { jwtService } from "../../libs/index";

const salt = bcrypt.genSaltSync(10);

export const getUsers: RequestHandler = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: "An error has occurred" }) // server error
        logcatch(error, `unable to get users adds with parameters ${req.body}`)
    }
};

export const register: RequestHandler = async (req, res) => {
    try {
        let userByEmail = await User.findOne({ email: req.body.data.email });
        if (userByEmail)
            return res.status(409).json({ message: "User already exists. Please choose a different email." });

        let userByusername = await User.findOne({ username: req.body.data.username });
        if (userByusername)
            return res.status(409).json({ message: "User already exists. Please choose a different username." });

        const data = req.body.data;
        console.log(data.password, "data.password");
        data.password = bcrypt.hashSync(req.body.data.password, salt);
        console.log(data, "req.User.create");
        const user = await User.create({ ...data });
        if (user)
            return res.status(201).json({ message: "Successfully registered user." });
    }
    catch (err) {
        logcatch(err, `unable to added user adds with parameters ${req.body}`)
        return res.status(500).json({ message: "An error has occurred" }) // server error
    }
};

export const login: RequestHandler = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.data.email }).select('+password');
        if (!user)
            return res.status(401).json({ message: "Invalid login credentials. Who is he?" });
        const passwordMatch = bcrypt.compareSync(req.body.data.password, user.password);
        if (!passwordMatch)
            return res.status(403).json({ message: "Invalid password login credentials" });
        const access_token = await jwtService.generateToken({ _id: user._id, expiresIn: '1d' });
        const refresh_token = await jwtService.generateToken({ _id: user._id, expiresIn: '90000ms' });
        res.header('Authorization', `Bearer ${access_token}`);
        res.cookie('refreshToken', refresh_token, { expires: new Date(Date.now() + (30 * 86400 * 1000)), httpOnly: true, secure: true });
        res.status(200).json({ message: `Welcome ${user.username}` });
    }
    catch (err) {
        logcatch(err, `unable to added user adds with parameters ${req.body}`)
        return res.status(500).json({ message: "An error has occurred" }) // server error
    }
};






