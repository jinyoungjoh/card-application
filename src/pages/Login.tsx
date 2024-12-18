import LoginForm from '@/components/login/LoginForm'
import { useAlertContext } from '@/contexts/AlertContext'
import { LoginFormValues } from '@/models/login'
import { auth } from '@/remote/firebase'
import { FirebaseError } from 'firebase/app'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const { open } = useAlertContext()
  const navigate = useNavigate()

  const handleSubmit = useCallback(
    async (formValues: LoginFormValues) => {
      const { email, password } = formValues

      try {
        await signInWithEmailAndPassword(auth, email, password)
        navigate('/')
      } catch (e) {
        // firebase 에러
        if (e instanceof FirebaseError) {
          if (e.code === 'auth/invalid-credential') {
            open({
              title: '계정의 정보를 다시 확인해주세요.',
              onButtonClick: () => {},
            })
            return
          }
        }
        // 서버 에러
        open({
          title: '잠시 후 다시 시도해주세요.',
          onButtonClick: () => {},
        })
      }
    },
    [navigate, open],
  )

  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  )
}

export default LoginPage
