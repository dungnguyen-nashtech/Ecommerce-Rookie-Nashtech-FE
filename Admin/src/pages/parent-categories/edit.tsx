import {Box, TextField} from "@mui/material";
import {Edit} from "@refinedev/mui";
import {useForm} from "@refinedev/react-hook-form";

export const ParentCategoryEdit = () => {
    const {
        refineCore: {queryResult},
        saveButtonProps,
        register,
        formState: {errors},
    } = useForm({});
    console.log(queryResult)
    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Box
                component="form"
                sx={{display: "flex", flexDirection: "column"}}
                autoComplete="off"
            >
                <TextField
                    {...register("title", {
                        required: "This field is required",
                    })}
                    error={!!(errors as any)?.title}
                    helperText={(errors as any)?.title?.message}
                    margin="normal"
                    fullWidth
                    InputLabelProps={{shrink: true}}
                    type="text"
                    label={"Title"}
                    name="title"
                />
            </Box>
        </Edit>
    );
};
