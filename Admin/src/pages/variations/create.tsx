import {Button, TextField} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import commonAxiosInstance from "../../axios/commonAxiosInstance";

export const VariationCreate = () => {

    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm({});

    const onSubmit: SubmitHandler<any> = async (dataSubmit) => {
        const submittedValue = await commonAxiosInstance.post(`/variationValue/variation`,
            dataSubmit.name,
            {
                headers: {
                    'Content-Type': 'text/plain',
                }
            }
        )

        if (submittedValue.status === 200) {
            window.location.href = "/variation";
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
                error={!!(errors as any)?.title}
                helperText={(errors as any)?.title?.message}
                margin="normal"
                fullWidth
                InputLabelProps={{shrink: true}}
                type="text"
                label={"Name"}
                name="name"
            />

            <Button type={"submit"}>Submit</Button>
        </form>
    );
};
