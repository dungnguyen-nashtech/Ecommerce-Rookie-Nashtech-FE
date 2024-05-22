import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import {useState} from "react";
import {useList} from "@refinedev/core";
import commonAxiosInstance from "../../axios/commonAxiosInstance";

export const CategoryCreate = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm({});

    const {data, isLoading} = useList({
        resource: "category/parent",
        sorters: [{field: "id", order: "asc"}],
    });

    const onSubmit: SubmitHandler<any> = async (dataSubmit) => {
        const submittedValue = await commonAxiosInstance.post('/category', dataSubmit)
        if (submittedValue.status === 200) {
            window.location.href = "/category";
        } else {
            alert("Failed to submit")
        }
    }

    if (isLoading) {
        return <div>Loading...</div>;
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
            <TextField
                {...register("description", {
                    required: "This field is required",
                })}
                error={!!(errors as any)?.content}
                helperText={(errors as any)?.content?.message}
                margin="normal"
                fullWidth
                InputLabelProps={{shrink: true}}
                multiline
                label={"Description"}
                name="description"
            />
            <FormControl style={{marginTop: "12px"}} fullWidth>
                <InputLabel id="category-select-label">Category</InputLabel>
                <Select
                    labelId="category-select-label"
                    id="category"
                    value={selectedCategory}
                    label="Category"
                    {...register("parentCategoryId")}
                    onChange={(event) => setSelectedCategory(event.target.value as string)}
                >
                    {data?.data.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                            {category.parentCategoryName}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <br/>
            <br/>
            <Button type={"submit"}>Submit</Button>
        </form>
    );
};
