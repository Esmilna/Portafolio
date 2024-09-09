import * as Yup from 'yup'

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const clientSchema = Yup.object({
    name: Yup.string("Ingresa un nombre").min(3, "El campo nombre debería de tener al menos 3 carácteres").required("Este campo es requerido"),
    lastName: Yup.string("Ingresa un apellido").min(3, "El campo Apellido debería de tener al menos 3 carácteres").required("Este campo es requerido"),
    email: Yup.string("Ingrese un correo").email("Ingrese un formato de email válido").required("Este campo es requerido"),
    address: Yup.string("Ingrese una dirección").min(8, "El campo de direccion requiere de al menos 8 carácteres").max(100, "Valor ingresado muy largo. Ingrese un valor menor a 100 carácteres").required("Este campo es requerido"),
    phone: Yup.string().matches(phoneRegExp, "Formato de número de teléfono no válido").required("Este campo es requerido")
})

export const userSchema = Yup.object({
    name: Yup.string("Ingresa un nombre").min(3, "El campo nombre debería de tener al menos 3 carácteres").required("Este campo es requerido"),
    lastName: Yup.string("Ingresa un apellido").min(3, "El campo Apellido debería de tener al menos 3 carácteres").required("Este campo es requerido"),
    username: Yup.string().min(5, "El campo Usuario debe de tener al menos 5 carácteres").required("Este campo es requerido"),
    email: Yup.string("Ingrese un correo").email("Ingrese un formato de email válido").required("Este campo es requerido"),
    password: Yup.string("Ingrese la contraseña").min(8, "La contraseña debe ser al menos 8 carácteres").required("Este campo es requerido"),
    confirmPassword: Yup.string("Confirme la contraseña").min(8, "La contraseña debe ser al menos 8 carácteres").required("Confirme la contraseña")
     .oneOf([Yup.ref('password'), null], "La contraseña debe de coincidir"),
    phone: Yup.string().optional().matches(phoneRegExp, "Formato de número de teléfono no válido"),
    termsAndConditions: Yup.boolean().oneOf([true], "Acepte los terminos y condiciones")
})

export const carSchema = Yup.object({
    name: Yup.string("Ingresa un nombre").min(3, "El campo nombre debería de tener al menos 3 carácteres").max(30, "Valor ingresado muy largo. Ingrese un valor menor a 30 carácteres").required("Este campo es requerido"),
    model: Yup.string("Ingresa el Modelo").required("Este campo es requerido"),
    color: Yup.string("Ingresa el color").required("Este campo es requerido"),
    year: Yup.number("Ingresa el año").min(1970, "El valor minimo aceptado es de 1970 en adelante").required("Este campo es requerido"),
    chasis: Yup.string("Ingresa el Chasis").max(15, "Valor ingresado muy largo. Ingrese un valor menor a 15 carácteres").required("Este campo es requerido").required("Este campo es requerido"),
    plate: Yup.string("Ingrese la placa").max(20, "Valor ingresado muy largo. Ingrese un valor menor a 20 carácteres").required("Este campo es requerido").required("Este campo es requerido"),
    cylinderCapacity: Yup.number("Ingrese el cilindraje").required("Este campo es requerido"),
    mileage: Yup.number("Ingrese los kilometros en tablero").required("Este campo es requerido"),
    numberOfDoors: Yup.number("Ingrese el numero de puertas").min(2, "El número minimo de puertas debe de ser de 2").required("Este campo es requerido"),
    price: Yup.number("Ingrese el precio").required("Precio requerido"),
    stock: Yup.number().optional(),
    transmition: Yup.string().oneOf(["Automática", "Manual"], "Valor invalido").required("Este campo es requerido"),
    fuel: Yup.string().oneOf(["Gasolina", "Gas", "Eléctrico"], "Valor invalido").required("Este campo es requerido"),
    description:  Yup.string("Ingresa la descripción del vehículo").required("Este campo es requerido"),
    imageUrl: Yup.string().optional().nullable(),
    imageData: Yup.string().optional()
})

export const userProfileSchema = Yup.object({
    name: Yup.string("Ingresa un nombre").min(3, "El campo nombre debería de tener al menos 3 carácteres").required("Este campo es requerido"),
    lastName: Yup.string("Ingresa un apellido").min(3, "El campo Apellido debería de tener al menos 3 carácteres").required("Este campo es requerido"),
    email: Yup.string("Ingrese un correo").email("Ingrese un formato de email válido").required("Este campo es requerido"),
    phone: Yup.string().optional().matches(phoneRegExp, "Formato de número de teléfono no válido"),
    address: Yup.string().optional().nullable(),
    imageUrl: Yup.string().optional().nullable(),
    imageData: Yup.string().optional().nullable()
})

export const newPasswordSchema = Yup.object({
    oldPassword: Yup.string("Ingrese la contraseña ").min(8, "La contraseña debe ser al menos 8 carácteres").required("Constraseña actua es requerida"), 
    password: Yup.string("Ingrese la contraseña").min(8, "La contraseña debe ser al menos 8 carácteres").required("Este campo es requerido"),
    confirmPassword: Yup.string("Confirme la contraseña").min(8, "La contraseña debe ser al menos 8 carácteres").required("Confirme la contraseña")
     .oneOf([Yup.ref('password'), null], "La contraseña debe de coincidir")
})

export const brandSchema = Yup.object({
    name: Yup.string("Ingresa un nombre").min(3, "El campo nombre debería de tener al menos 3 carácteres").required("Este campo es requerido")
})

export const modelSchema = Yup.object({
    name: Yup.string("Ingresa un nombre").min(3, "El campo nombre debería de tener al menos 3 carácteres").required("Este campo es requerido"),
    brandID: Yup.string().required("Se requiere la marca")
})

export const checkoutUserInformationSchema = Yup.object({
    name: Yup.string("Ingresa un nombre").min(3, "El campo nombre debería de tener al menos 3 carácteres").required("Este campo es requerido"),
    lastName: Yup.string("Ingresa un apellido").min(3, "El campo Apellido debería de tener al menos 3 carácteres").required("Este campo es requerido"),
    address: Yup.string("Ingrese una dirección").min(8, "El campo de direccion requiere de al menos 8 carácteres").max(100, "Valor ingresado muy largo. Ingrese un valor menor a 100 carácteres").required("Este campo es requerido"),
    phone: Yup.string().matches(phoneRegExp, "Formato de número de teléfono no válido").required("Este campo es requerido"),
    payment: Yup.string().required("Seleccione un metodo de pago")
})