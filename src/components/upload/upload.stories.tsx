import React from "react";
import Upload from "./index";

export default {
title: "Upload",
component: Upload,
};

export const imgUpload = () => <Upload uploadMode='img' />;
export const defaultUpload = () => <Upload />;