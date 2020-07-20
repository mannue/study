import React, {Component, PropTypes} from 'react';
import {DataTypes} from "./Types";


const protocol = "http";
const hostname= "127.0.0.1";
const port = 3500;

export const RestUrls = {
    [DataTypes.PRODUCTS]: `${protocol}://${hostname}:${port}/api/products`,
    [DataTypes.CATEGORIES]: `${protocol}://${hostname}:${port}/api/categories`,
};