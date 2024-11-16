import { Request, Response } from "express";
import User from "../model/userModel";
import bcrypt from "bcrypt"

class UserController {

    async softDeleteUser(req: Request, res: Response) {

        try {
            const userId = req.userId;
            const user = await User.findById(userId);
            if(user!=null) {
                user.is_enabled = false;
                await user.save()
            }
            return res.status(200).send(`${user?.first_name} ${user?.last_name} deleted succesfully`);
        } catch (error) {
            return res.status(404).json({ error: "User not found" });
        }
    }

    async updateUser(req: Request, res: Response) {
  
        try {
            const userId = req.userId;
            const user = await User.findByIdAndUpdate(userId, req.body, {
            new: true,
            });
            return res.status(200).json(user);
        } catch (error) {
            return res.status(404).json({ error: "User not found" });
        }
    }

    async getUserInformation(req: Request, res: Response) {
  
        try {
            const userId = req.userId;
            const user = await User.findById(userId, 'first_name last_name email role');

            if(user!=undefined) {
                 return res.status(200).json(user);
            } else {
                return res.status(500);
            }        
        }
         catch(error) {
            return res.status(500);
        }
  
    }  

    async fullDeleteUser(req: Request, res: Response) {
        const id = req.params.id;

        try {

            const user = await User.findById(id);

            if (user?.role === 'admin') {
                return res.status(403).json({ error: "Cannot delete an admin user" });
            }

            const deletedUser = await User.findByIdAndDelete(id);
              
              if(deletedUser!=undefined) {
                return res.status(200).json(`${deletedUser.first_name} ${deletedUser.last_name} succesfully deleted`);
              }
            }
         catch (error) {
            return res.status(404).json({ error: "User not found" });
        }
    }

    async updatePassword(req: Request, res: Response) {
        try {

            const { currentPassword, newPassword, repeatedNewPassword } = req.body;
            const userId = req.userId;

            if (newPassword !== repeatedNewPassword) {
                return res.status(400).json({ message: 'Las nuevas contraseñas no coinciden.' });
            }

            const hashedPassword = await User.findById(userId, 'password');
            if(hashedPassword!=null) {
                const match = await bcrypt.compare(currentPassword, hashedPassword.password);
                const hashedNewPassword = await bcrypt.hash(newPassword, 10)
                if(match) {
                    await User.findByIdAndUpdate(
                        userId,
                        { password: hashedNewPassword },
                        { new: true }
                    );
                }
            }
            return res.status(200).json({ message: 'Contraseña actualizada exitosamente.' });
        } catch (error) {
            console.error('Error al actualizar la contraseña:', error);
            return res.status(500).json({ message: 'Error al actualizar la contraseña.' });
        }
    }

    async getUserInformationByEmail(req: Request, res: Response) {
  
        try {
            const { email } = req.query;
            //const userId = req.userId;
            const user = await User.findOne({ email }, 'first_name last_name phone email role');

            if(user!=undefined) {
                 return res.status(200).json(user);
            } else {
                return res.status(500);
            }        
        }
         catch(error) {
            return res.status(500);
        }
    }

    async getAllCustomers(req: Request, res: Response) {
        try {
            const users = await User.find({role: 'customer'});
            return res.status(200).json(users);
        } catch (error) {
            console.log(error);
        }
    }

    async pauseUserCostumer(req: Request, res: Response) {
        const { userId } = req.body;

        try {
            const user = await User.findById(userId);
            if(user!=null) {
                user.is_active = false;
                await user.save()
            }
            return res.status(200).send(`${user?.first_name} ${user?.last_name} now paused`);
        } catch (error) {
            
        }
    }

}
export const userController = new UserController();
