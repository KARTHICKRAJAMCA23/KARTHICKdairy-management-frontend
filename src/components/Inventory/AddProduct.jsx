import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import {useState} from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import updateField from "../../utils/updateField.jsx";
import {Textarea} from "@mui/joy";
import {useRecoilState} from "recoil";
import {userAtom} from "../../atoms/user.jsx";
import {productsAtom} from "../../atoms/products.jsx";
import axios from "axios";

export default function AddProduct(props) {
    const [products, setProducts] = useRecoilState(productsAtom);
    const [loading, setLoading] = useState(false);

    const {open, setOpen} = props;
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: 0.0,
        discount: 0.0,
        weeklyQuantity: 0,
    });

    const keyToLabel = {
        name: 'Name',
        description: 'Description',
        price: 'Price',
        discount: 'Discount',
        weeklyQuantity: 'Weekly Quantity',
    }

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        async function addProduct() {
            const response = await
                axios.post('https://dairy-management-backend-5m7b.onrender.com/api/vendor/addProduct', formData);

            const newProductsResponse = await
                axios.post('https://dairy-management-backend-5m7b.onrender.com/api/general/getProducts', {});

            setProducts(newProductsResponse.data.products);
        }

        addProduct()
            .then(() => {
                console.log("Product added successfully");
                setOpen(false);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                alert(err);
                setOpen(false);
                setLoading(false);
            });
    }

    const getInput = (key) => {
        const decroratorMap = {
            'price': '₹',
            'discount': '%',
            'weeklyQuantity': 'units',
        }
        if (key === 'description')
        {
            return (<Textarea
                sx={{
                    fontSize: 'large',
                    padding: 1,
                    border: 1,
                    borderColor: 'primary.main'
                }}
                value={formData[name]}
                minRows={3}
                variant={"outlined"}
                color={"text.primary"}
                onChange={(e) =>
                    setFormData({...updateField(formData, key, e.target.value)})}/>
            )
        }
        else if (key === 'price' || key === 'discount')
        {
            return (<Input
                sx={{
                    fontSize: 'large',
                    padding: 1,
                    border: 1,
                    borderColor: 'primary.main'
                }}
                value={formData[name]}
                variant={"outlined"}
                type={"number"}
                defaultValue={0}
                slotProps={{
                    input: {
                        step: 0.1,
                    },
                }}
                color={"text.primary"}
                endDecorator={decroratorMap[key]}
                onChange={(e) =>
                    setFormData({...updateField(formData, key, e.target.value)})}/>
            )
        }
        else if (key === 'weeklyQuantity')
        {
            return (<Input
                    sx={{
                        fontSize: 'large',
                        padding: 1,
                        border: 1,
                        borderColor: 'primary.main'
                    }}
                    value={formData[name]}
                    variant={"outlined"}
                    type={"number"}
                    defaultValue={0}
                    color={"text.primary"}
                    endDecorator={decroratorMap[key]}
                    onChange={(e) =>
                        setFormData({...updateField(formData, key, e.target.value)})}/>
            )
        }
        else {
            return (<Input
                sx={{
                    fontSize: 'large',
                    padding: 1,
                    border: 1,
                    borderColor: 'primary.main'
                }}
                value={formData[name]}
                variant={"outlined"}
                color={"text.primary"}
                onChange={(e) =>
                    setFormData({...updateField(formData, key, e.target.value)})}/>
            )
        }
    }


    return (
        <React.Fragment>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                onClose={() => setOpen(false)}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}
            >
                <Sheet
                    variant="outlined"
                    sx={{
                        maxWidth: 500,
                        minWidth: 600,
                        borderRadius: 'md',
                        p: 2,
                        paddingLeft: 10,
                        paddingRight: 10,
                        boxShadow: 'lg',
                    }}
                >
                    <ModalClose
                        variant="outlined"
                        sx={{
                            top: 'calc(-1/4 * var(--IconButton-size))',
                            right: 'calc(-1/4 * var(--IconButton-size))',
                            boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                            borderRadius: '50%',
                            bgcolor: 'background.body',
                        }}
                    />

                    <form onSubmit={handleSubmit}>
                        {Object.keys(formData).map((key) => (
                            <FormControl>
                                <FormLabel sx={{paddingTop: 2}}>
                                    {keyToLabel[key]}
                                </FormLabel>
                                {getInput(key)}
                            </FormControl>
                        ))}
                        <Button type={"submit"} loading={loading}
                                color={"primary"} variant={"outlined"}
                                sx={{marginTop: 2}}>
                            Add Product
                        </Button>
                    </form>
                </Sheet>
            </Modal>
        </React.Fragment>
    );
}