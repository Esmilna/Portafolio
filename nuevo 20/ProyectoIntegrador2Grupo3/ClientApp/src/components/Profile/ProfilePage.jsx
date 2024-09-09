import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userProfileSchema } from '../../helpers/formsSchema';
import { getCurrentUser, updateProfile } from '../../helpers/userHelpers';
import { useAlert } from '../Context/AlertContext';
import Loading from '../Loading/Loading';
import ProfileForm from './ProfileForm';
import './profile.css'

function ProfilePage() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    const { showAlert } = useAlert()
    const navigate = useNavigate()

    useEffect(() => {
        getCurrentUser()
            .then(data => {
                setData(data)
            })
            .catch(err => showAlert("danger", err.message))
            .finally(() => {
                setLoading(false)
            })
    },[showAlert])

    if(loading){
        return <Loading />
    }

    if(!data){
        navigate("/pagenotfound")
    }

    return (
        <div className="profile">
            <Formik 
                initialValues={{
                name: data.nombre,
                lastName: data.apellido,
                email: data.correo,
                address: data.direccion,
                phone: data.telefono,
                imageUrl: data.imageURL,
                imageData: ''
                }}
                validationSchema={userProfileSchema}
                onSubmit = {async (values) => {
                    const request = {
                        Nombre: values.name,
                        Apellido: values.lastName,
                        Correo: values.email,
                        Direccion: values.address,
                        Telefono: values.phone,
                        ImageURL: values.imageUrl,
                        imageData: values.imageData
                    }

                    updateProfile(request, data.id)
                        .then(data => {
                            if(data.success){
                                showAlert("success", data.message)
                            }else{
                                showAlert("danger", data.message)
                            }
                        })
                        .catch(err => showAlert("danger", err.message))
                }}
            >
            {({...args}) => <ProfileForm {...args} data={data}/>}
            </Formik>

        </div>
    )
}


    export default ProfilePage;
