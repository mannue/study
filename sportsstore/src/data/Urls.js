import React, {Component, PropTypes} from 'react';
import {DataTypes} from "./Types";


const protocol = "http";
const hostname= "10.252.9.228";
const port = 3500;

export const RestUrls = {
    [DataTypes.PRODUCTS]: `${protocol}://${hostname}:${port}/api/products`,
    [DataTypes.CATEGORIES]: `${protocol}://${hostname}:${port}/api/categories`,
};