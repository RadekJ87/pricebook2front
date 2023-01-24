import React, {useEffect, useState} from 'react';
import axios from "axios";
import Box from "@mui/material/Box";
import LoadingModal from "../components/LoadingModal";
import ProductsTable from "../components/ProductsTable";
import ProductsSearchBarWithButton from "../components/ProductsSearchBarWithButton";
import WallpaperDiv from '../components/WallpaperDiv';
import test from '../images/backgroundLogin.avif';
import ProductsSearchBar from "../components/ProductsSearchBar";



// for mockup
// const columns = [
//     {id: 'description', label: 'Opis', minWidthXS: 25, minWidthMD: 170, align: 'center'},
//     {id: 'drawing', label: 'Numer\u00a0rysunku', minWidthXS: 20, minWidthMD: 80, align: 'center'},
//     {id: 'rev', label: 'Rewizja', displayXS: "none", displayMD: "table-cell", minWidthXS: 10, minWidthMD: 40, align: 'center'},
//     {id: 'material', label: 'Numer\u00a0materiału\u00a0klienta', displayXS: "none", displayMD: "table-cell", minWidthXS: 20, minWidthMD: 150, align: 'center'},
//     {id: 'moq', label: 'MOQ', minWidthXS: 10, minWidthMD: 40, align: 'center'},
//     {id: 'price', label: 'Cena', minWidthXS: 10, minWidthMD: 40, align: 'right', format: (value) => value.toLocaleString('pl')},
// ];

// const createRandomProduct = () => {
//     return {
//         productID: faker.datatype.uuid(),
//         description: faker.commerce.product(),
//         drawing: faker.datatype.number({min: 100000, max: 99999999, precision: 1}),
//         rev: faker.datatype.number({min: 0, max: 99, precision: 1}),
//         material: faker.datatype.number({min: 100000, max: 9999999999, precision: 1}),
//         moq: faker.datatype.number({min: 1, max: 1000, precision: 1}),
//         price: faker.finance.amount(0.01, 1000, 2, '€'),
//     };
// }
//
// export const products = [];
//
// Array.from({length: 50}).forEach(() => {
//     products.push(createRandomProduct());
// });

// API
const columns = [
    {id: 'description', label: 'Opis', minWidthXS: 25, minWidthMD: 170, align: 'center'},
    {id: 'drawingNumber', label: 'Numer\u00a0rysunku', minWidthXS: 20, minWidthMD: 80, align: 'center'},
    {
        id: 'revision',
        label: 'Rewizja',
        displayXS: "none",
        displayMD: "table-cell",
        minWidthXS: 10,
        minWidthMD: 40,
        align: 'center'
    },
    {
        id: 'itemNumber',
        label: 'Numer\u00a0materiału\u00a0klienta',
        displayXS: "none",
        displayMD: "table-cell",
        minWidthXS: 20,
        minWidthMD: 150,
        align: 'center'
    },
    {id: 'moq', label: 'MOQ', minWidthXS: 10, minWidthMD: 40, align: 'center'},
    {
        id: 'price',
        label: 'Cena',
        minWidthXS: 10,
        minWidthMD: 40,
        align: 'right',
        format: (value) => value.toLocaleString('pl')
    },
];


const Products = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");


    useEffect(() => {
        setIsLoading(true);
        const fetchProducts = async () => {
            const res = await axios.get(`https://pricebooktwo-api.onrender.com/api/products/${search}`);
            setProducts(res.data);
            setIsLoading(false);
        }
        fetchProducts().catch(console.error);

        return () => {}
    }, [search])


    // const handleInputChange = (event) => {
    //     setSearch(event.target.value);
    // }

    const handleSearch = async (search) => {
        setSearch(search);
    }

    return (
        <WallpaperDiv width="100%" position="absolute" top="5%" image={test}>
            <Box sx={{
                //lg macbook
                // width: {xs: '380px', sm: "560px", md: "880px", lg: "1200px", xl: "1600px"},
                width: "85%",
                display: 'flex',
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-around",
            }}>
                {/*<ProductsSearchBar onInputChange={handleInputChange}/>*/}
                <ProductsSearchBarWithButton onSearch={handleSearch}/>
                <LoadingModal isLoading={isLoading}/>
                {isLoading ? null : <ProductsTable products={products} columns={columns} search={search}/>}
            </Box>
        </WallpaperDiv>
    );
};

export default Products;





