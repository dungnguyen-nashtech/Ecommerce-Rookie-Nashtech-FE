import {Box, TextField} from "@mui/material";
import {Edit} from "@refinedev/mui";
import {useForm} from "@refinedev/react-hook-form";

export const CategoryEdit = () => {
    const {
        saveButtonProps,
        register,
    } = useForm({});

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Box
                component="form"
                sx={{display: "flex", flexDirection: "column"}}
                autoComplete="off"
            >
                <TextField
                    {...register("name", {
                        required: "This field is required",
                    })}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{shrink: true}}
                    type="text"
                    label={"Name"}
                    name="name"
                />
                <TextField
                    {...register("description", {
                        required: "This field is required",
                    })}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{shrink: true}}
                    type="text"
                    label={"Description"}
                    name="description"
                />
            </Box>
        </Edit>
    );
};
