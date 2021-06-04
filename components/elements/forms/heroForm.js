import { useState } from 'react'
import { fetchAPI } from 'utils/api'
import * as yup from 'yup'
import { Formik, Form, Field } from 'formik'
import Loader from '../loader'
const HeroForm = ({ data }) => {
  const [loading, setLoading] = useState(false)

  const LeadSchema = yup.object().shape({
    email: yup.string().email().required(),
  })

   const {message, emailPlaceholder, location, submitButton, secondMessage} = data
  return (
    <div className="py-10 text-center flex flex-col">
      <p className="mb-10 font-bold mb-2">{message}</p>
      <p className="mb-10 font-bold mb-2">{secondMessage}</p>
      <div className="flex flex-col items-center">
        <Formik
          initialValues={{ email: '' }}
          validationSchema={LeadSchema}
          onSubmit={async (values, { setSubmitting, setErrors, setStatus }) => {
            setLoading(true)
            setSubmitting(true)
            try {
              setErrors({ api: null })
              await fetchAPI('/lead-form-submissions', {
                method: 'POST',
                body: JSON.stringify({
                  email: values.email,
                  location: location,
                })
              }).then(response => {
                const message = response ? 'Submitted' : 'no';
                setStatus(message);
                
            //  return submitMessage
              })
             
            } catch (err) {
              setErrors({ api: err.message })
            }
            setLoading(false)
            setSubmitting(false)

          }}
        >
          {({ errors, touched, isSubmitting, status }) => (
            <div className="flex flex-col" >
              <Form className="flex flex-col md:flex-row gap-4">
                <Field
                  className="text-base focus:outline-none py-4 md:py-0 px-4 border-2 rounded-md"
                  type="email"
                  name="email"
                  placeholder={emailPlaceholder}
                />
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {loading  && <Loader />}
                  {submitButton}
                </button>
              </Form>
                  <div className="text-white pt-5">{status}</div>
              <p className="text-red-500 h-12 text-sm mt-1 ml-2 text-left">
                {(errors.email && touched.email && errors.email) || errors.api}
              </p>
            </div>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default HeroForm
