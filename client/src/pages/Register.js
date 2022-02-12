import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react'
import { gql, useMutation } from '@apollo/client'
import { useForm } from '../utils/hooks';

const Register = (props) => {


    const [errors, setErrors] = useState({})
    // const [values, setValues] = useState({
    //     username: "",
    //     email: "",
    //     password: "",
    //     confirmPassword: ""
    // })

    // const onChange = (e) => {
    //     setValues({ ...values, [e.target.name]: e.target.value })
    // }

    
    const { onChange, onSubmit, values } = useForm(registerUser, {
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        })

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(_, result) {
            console.log(result)
            props.history.push('/')
        },
        onError(err) {
            const obj = err.graphQLErrors[0].extensions
            delete obj.code
            delete obj.exception
            setErrors(obj);
        },
        variables: values
    })

    function registerUser() {
        addUser()
    }

    // const onSubmit = (e) => {
    //     e.preventDefault()
    //     addUser()
    // }

    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
                <h1>Register</h1>
                <Form.Input
                    label="Username"
                    placeholder="Username"
                    name="username"
                    value={values.username}
                    error={!!errors.username}
                    onChange={onChange} />
                <Form.Input
                    label="Email"
                    placeholder="Email"
                    name="email"
                    value={values.email}
                    error={!!errors.email}
                    onChange={onChange} />
                <Form.Input
                    label="Password"
                    placeholder="Password"
                    name="password"
                    value={values.password}
                    error={!!errors.password}
                    onChange={onChange}
                    type="password"
                />
                <Form.Input
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    error={!!errors.confirmPassword}
                    onChange={onChange}
                    type="password"
                />
                <Button type="submit" primary>
                    Register
                </Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map((value) => {
                            if (typeof value === "object") {
                                return <li key={Object.values(value)[0]}>{Object.values(value)[0]}</li>
                            }
                            else {
                                return <li key={value}>{value}</li>
                            }
                        }
                        )}
                    </ul>
                </div>
            )
            }
        </div >
    )
}

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register (
            registerInput : {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ){
            id email username token createdAt
        }
    }
`

export default Register