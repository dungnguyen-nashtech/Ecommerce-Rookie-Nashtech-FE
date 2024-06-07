import {Box, Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {useForm} from "@refinedev/react-hook-form";
import React, {useState} from "react";
import {QueryListRole} from "../../services/queries/query-get";
import {SubmitHandler} from "react-hook-form";
import commonAxiosInstance from "../../axios/commonAxiosInstance";

export const UserCreate = () => {
    const [enabled, setEnabled] = useState('');
    const [selectedRole, setSelectedRole] = useState<string[]>([]);

    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm({});


    const queryListRole = QueryListRole();

    if (queryListRole.isLoading) {
        return <div>Loading...</div>;
    }

    const onSubmit: SubmitHandler<any> = async (dataSubmit) => {
        dataSubmit.enabled = enabled;
        const submittedValue = await commonAxiosInstance.post(`http://localhost:8080/api/v1/user`, dataSubmit)
        if (submittedValue.status < 300) {
            window.location.href = "/user";
        } else {
            alert("Failed to submit")
        }
    }


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} style={{display: "flex", flexDirection: "column"}}>
                <Box
                    component="form"
                    sx={{display: "flex", flexDirection: "column"}}
                    autoComplete="off"
                >
                    <TextField
                        {...register("email")}
                        margin="normal"
                        fullWidth
                        InputLabelProps={{shrink: true}}
                        type="text"
                        label={"Email"}
                        name="email"
                    />
                    <TextField
                        {...register("password")}
                        margin="normal"
                        fullWidth
                        InputLabelProps={{shrink: true}}
                        type="text"
                        label={"Password"}
                        name="password"
                    />
                    <TextField
                        {...register("firstName")}
                        margin="normal"
                        fullWidth
                        InputLabelProps={{shrink: true}}
                        type="text"
                        label={"First Name"}
                        name="firstName"
                    />
                    <TextField
                        {...register("lastName")}
                        margin="normal"
                        fullWidth
                        InputLabelProps={{shrink: true}}
                        type="text"
                        label={"Last Name"}
                        name="lastName"
                    />
                    <FormControl style={{marginTop: "25px"}} fullWidth>
                        <InputLabel id="featured-select-label">Enabled</InputLabel>
                        <Select
                            labelId="featured-select-label"
                            id="enabled"
                            label="Enabled"
                            value={enabled}
                            {...register("enabled")}
                            onChange={(event) => setEnabled(event.target.value as string)}
                        >
                            <MenuItem value={"true"}>True</MenuItem>
                            <MenuItem value={"false"}>False</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl style={{marginTop: "12px"}} fullWidth>
                        <InputLabel id="role-select-label">Roles</InputLabel>
                        <Select
                            labelId="role-select-label"
                            id="roles"
                            multiple
                            value={selectedRole}
                            label="Roles"
                            {...register("roleNames")}
                            onChange={(event) => setSelectedRole(event.target.value as string[])}
                        >
                            {queryListRole.data.map((role: { roleName: string }) => (
                                <MenuItem key={role.roleName} value={role.roleName}>
                                    {role.roleName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <br/>
                <br/>
                <Button type={"submit"}>Submit</Button>
            </form>
        </>
    );
};
