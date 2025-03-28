import * as React from "react"
import Box from "@mui/joy/Box"
import Button from "@mui/joy/Button"
import Checkbox from "@mui/joy/Checkbox"
import FormControl from "@mui/joy/FormControl"
import FormLabel, {formLabelClasses} from "@mui/joy/FormLabel"
import Link from "@mui/joy/Link"
import Input from "@mui/joy/Input"
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios'
import {useRecoilState} from "recoil";
import {userAtom} from "../../atoms/user"

export default function VendorSignIn() {
    const [user, setUser] = useRecoilState(userAtom);
    const navigate = useNavigate();
    let {state} = useLocation()

    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        try {
            const url = "https://dairy-management-backend-5m7b.onrender.com/api/vendor/login"
            const details = {
                emailID: data.get('email'),
                password: data.get('password')
            }
            const res = await axios.post(url, details)
            setUser({...user, ...res.data.vendor});
            localStorage.setItem("token", res.data.token);
            navigate('/vendor/inventory');
        } catch (error) {
            console.log(error)
            alert(error.response.data.error);
        }
    }


    return (
        <React.Fragment>
            <form onSubmit={handleSubmit}>
                <FormControl required>
                    <FormLabel>Email</FormLabel>
                    <Input
                        placeholder="Enter your email"
                        type="email"
                        name="email"
                    />
                </FormControl>
                <FormControl required>
                    <FormLabel>Password</FormLabel>
                    <Input placeholder="•••••••" type="password" name="password"/>
                </FormControl>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >
                    <Link fontSize="sm" href="#replace-with-a-link" fontWeight="lg">
                        Forgot password
                    </Link>
                </Box>
                <Button type="" fullWidth>
                    Submit
                </Button>
            </form>
        </React.Fragment>
    )
}