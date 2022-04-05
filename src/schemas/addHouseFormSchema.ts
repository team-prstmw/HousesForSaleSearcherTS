import * as yup from 'yup';

import { NEGATIVE_NUMBER_ERROR, POSITIVE_NUMBER_ERROR, REQUIRED_ERROR, SPECIAL_CHARACTERS_ERROR } from './const';

export interface FieldsSchema {
  streetNumber: string;
  streetName: string;
  streetSuffix: string;
  city: string;
  state: string;
  price: number;
  propertyType: string;
  yearBuilt: number;
  dimension: number;
  floor: number;
  floorsInBuilding: number;
  roomsNumber: number;
  bathroomNumber: number;
  heating: string;
  descriptionField: string;
}

export const addHouseFormSchema = yup.object({
  streetNumber: yup
    .string()
    .required(REQUIRED_ERROR)
    .matches(/^[A-Za-z0-9 ]+$/, SPECIAL_CHARACTERS_ERROR),
  streetName: yup.string().required(REQUIRED_ERROR),
  streetSuffix: yup.string().required(REQUIRED_ERROR),
  city: yup
    .string()
    .required(REQUIRED_ERROR)
    .matches(/^[A-Za-z0-9 ]+$/, SPECIAL_CHARACTERS_ERROR),
  state: yup
    .string()
    .required(REQUIRED_ERROR)
    .matches(/^[A-Za-z0-9 ]+$/, SPECIAL_CHARACTERS_ERROR),
  price: yup.number().positive(POSITIVE_NUMBER_ERROR).required(REQUIRED_ERROR),
  propertyType: yup.string().required(REQUIRED_ERROR),
  yearBuilt: yup.number().positive(POSITIVE_NUMBER_ERROR).required(REQUIRED_ERROR),
  dimension: yup.number().positive(POSITIVE_NUMBER_ERROR).required(REQUIRED_ERROR),
  floor: yup.number().min(0, NEGATIVE_NUMBER_ERROR).required(REQUIRED_ERROR),
  floorsInBuilding: yup.number().min(0, NEGATIVE_NUMBER_ERROR).required(REQUIRED_ERROR),
  roomsNumber: yup.number().positive(POSITIVE_NUMBER_ERROR).required(REQUIRED_ERROR),
  bathroomNumber: yup.number().positive(POSITIVE_NUMBER_ERROR).required(REQUIRED_ERROR),
  heating: yup.string().required(REQUIRED_ERROR),
  descriptionField: yup.string().required(REQUIRED_ERROR),
});
