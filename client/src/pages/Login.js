import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react'
import { gql, useMutation } from '@apollo/client'
import { useForm } from '../utils/hooks';

const Login = (props) => {


    const [errors, setErrors] = useState({})


    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        username: "",
        password: ""
    })

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
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

    function loginUserCallback() {
        loginUser()
    }

    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
                <h1>Login</h1>
                <Form.Input
                    label="Username"
                    placeholder="Username"
                    name="username"
                    value={values.username}
                    error={!!errors.username}
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
                <Button type="submit" primary>
                    Login
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

const LOGIN_USER = gql`
    mutation login(
        $username: String!
        $password: String!
    ) {
        login (
            login: {
                username: $username
                password: $password
            }
        ){
            id email username token createdAt
        }
    }
`

export default Login