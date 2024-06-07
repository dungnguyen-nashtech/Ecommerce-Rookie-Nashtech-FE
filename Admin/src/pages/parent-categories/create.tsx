import {Button, TextField} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import commonAxiosInstance from "../../axios/commonAxiosInstance";

export const ParentCategoryCreate = () => {
    const {
        register,
        handleSubmit
    } = useForm({});

    const onSubmit: SubmitHandler<any> = async (dataSubmit) => {
        const submittedValue = await commonAxiosInstance.post('/category/parent', dataSubmit)
        if (submittedValue.status < 300) {
            window.location.href = "/category/parent";
        } else {
            alert("Failed to submit")
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            style={{display: "flex", flexDirection: "column"}}
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
                multiline
                label={"Description"}
                name="description"
            />

            <br/>
            <br/>
            <Button type={"submit"}>Submit</Button>
        </form>
    );
};
