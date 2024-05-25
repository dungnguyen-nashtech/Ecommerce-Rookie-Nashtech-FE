import {Box, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography} from "@mui/material";
import {DateField, Edit} from "@refinedev/mui";
import {useForm} from "@refinedev/react-hook-form";
import React, {useState} from "react";
import {QueryListRole} from "../../services/queries/query-get";

export const UserEdit = () => {
    const [enabled, setEnabled] = useState('');
    const [selectedRole, setSelectedRole] = useState<string[]>([]);


    const {
        saveButtonProps,
        refineCore: {queryResult, formLoading}, // queryResult?.data?.data
        register,
    } = useForm({});

    const data = queryResult?.data?.data;

    const queryListRole = QueryListRole();

    if (queryListRole.isLoading) {
        return <div>Loading...</div>;
    }

    const listCurrentRoles = () => {
        let roles = "";
        data?.roles.map((role: { roleName: string; }) => (
            roles += ", " + role?.roleName
        ))
        return roles.slice(1);
    }

    if (formLoading) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
                <Box
                    component="form"
                    sx={{display: "flex", flexDirection: "column"}}
                    autoComplete="off"
                >
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
                            value={enabled == '' ? data?.enabled : enabled}
                            label="Enabled"
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
                        <TextField
                            margin="normal"
                            fullWidth
                            InputLabelProps={{shrink: true}}
                            type="text"
                            label={"Current Roles"}
                            disabled={true}
                            value={listCurrentRoles()}
                        />
                    </FormControl>
                </Box>
            </Edit>
            <br/>
            <Stack gap={1}>
                <Typography variant="body1" fontWeight="bold">
                    {"ID"} : {data?.id}
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                    {"Created On"}
                </Typography>
                <DateField
                    format={"DD:MM:YYYY HH:mm hh:mm:ss A"}
                    value={data?.createdOn}/>
                <Typography variant="body1" fontWeight="bold">
                    {"Last Updated On"}
                </Typography>
                <DateField
                    format={"DD:MM:YYYY HH:mm hh:mm:ss A"}
                    value={data?.lastUpdatedOn}/>
            </Stack>
        </>
    );
};
