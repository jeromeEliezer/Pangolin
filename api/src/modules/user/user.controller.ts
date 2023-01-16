import { RequestHandler } from "express";
import bcrypt from "bcrypt";

import { logcatch } from "../../utils/logger";
import User from "./user.model";
import { jwtService } from "../../libs/index";

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
        const data = req.body;
        const salt = bcrypt.genSaltSync(10);
        data.password = bcrypt.hashSync(req.body.password, salt);
        const user = await User.create(data);
        res.status(200).json(user);
    }
    catch (err) {
        logcatch(err, `unable to added user adds with parameters ${req.body}`)
        res.status(500).json({ message: "An error has occurred" }) // server error
    }
};

export const login: RequestHandler = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.data.email }).select('+password');
        if (!user)
            return res.status(401).json({ message: "Invalid login credentials. Who is he?" });
        const passwordMatch = bcrypt.compareSync( req.body.data.password, user.password );
        if (!passwordMatch)
            return res.status(403).json({ message: "Invalid password login credentials" });
        const access_token = await jwtService.generateToken({ _id: user._id, expiresIn: '1d' });
        const refresh_token = await jwtService.generateToken({ _id: user._id, expiresIn: '90000ms' });
        res.header('Authorization', `Bearer ${access_token}`);
        res.cookie('refreshToken', refresh_token, { expires: new Date(Date.now() + (30 * 86400 * 1000)), httpOnly: true, secure: true });
        res.status(200).json(user);
    }
    catch (err) {
        logcatch(err, `unable to added user adds with parameters ${req.body}`)
        return res.status(500).json({ message: "An error has occurred" }) // server error
    }
};






