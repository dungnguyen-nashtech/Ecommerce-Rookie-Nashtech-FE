import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import commonAxiosInstance from "../../axios/commonAxiosInstance";
import {QueryAllVariation} from "../../services/queries/query-get";
import React, {useState} from "react";

export const VariationValueCreate = () => {
    const [selectVariation, setSelectVariation] = useState<string>('');

    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm({});

    const queryAllVariation = QueryAllVariation();

    if (queryAllVariation.isLoading) {
        return <div>Loading...</div>;
    }

    const onSubmit: SubmitHandler<any> = async (dataSubmit) => {
        const submittedValue = await commonAxiosInstance.post(`/variationValue/${selectVariation}`,
            dataSubmit.name,
            {
                headers: {
                    'Content-Type': 'text/plain',
                }
            }
        )

        if (submittedValue.status < 300) {
            window.location.href = "/variationValue";
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

            <FormControl style={{marginTop: "12px"}} fullWidth>
                <InputLabel id="role-select-label">Variation</InputLabel>
                <Select
                    labelId="role-select-label"
                    id="roles"
                    value={selectVariation}
                    label="Roles"
                    {...register("roleNames")}
                    onChange={(event) => setSelectVariation(event.target.value as string)}
                >
                    {queryAllVariation.data.map((variation: { id: number, name: string }) => (
                        <MenuItem key={variation.id} value={variation.id}>
                            {variation.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Button type={"submit"}>Submit</Button>
        </form>
    );
};
