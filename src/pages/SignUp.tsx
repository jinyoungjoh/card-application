import { COLLECTIONS } from '@/constants'
import { SignUpFormValues } from '@/models/signup'
import { auth, store } from '@/remote/firebase'
import SignUpForm from '@/components/signup/SignUpForm'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { collection, doc, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { FirebaseError } from 'firebase/app'
import { useAlertContext } from '@/contexts/AlertContext'
import { useSetRecoilState } from 'recoil'
import { userAtom } from '@/atom/user'

function SignUpPage() {
  const { open } = useAlertContext()
  const navigate = useNavigate()
  const setUser = useSetRecoilState(userAtom)
  const handleSubmit = async (form: SignUpFormValues) => {
    const { email, password, name } = form

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      )

      await updateProfile(user, {
        displayName: name,
      })

      const newUser = {
        uid: user.uid,
        email: user.email,
        displayName: name,
      }

      // user.uid를 id값으로 저장
      await setDoc(doc(collection(store, COLLECTIONS.USER), user.uid), newUser)
      setUser({
        uid: user.uid,
        email: user.email ?? '',
        displayName: user.displayName ?? '',
      })
      navigate('/')
    } catch (e) {
      // firebase 에러
      if (e instanceof FirebaseError) {
        if (e.code === 'auth/email-already-in-use') {
          open({
            title: '이미 가입된 계정입니다.',
            description: '계정 정보를 다시 확인해주세요.',
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
  }

  return (
    <div>
      <SignUpForm onSubmit={handleSubmit} />
    </div>
  )
}

export default SignUpPage
