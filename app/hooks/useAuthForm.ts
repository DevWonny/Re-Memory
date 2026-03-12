import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/store/auth';
import { useLoading } from '@/store/loading';
import { useModalStore } from '@/store/modal';

export const useAuthForm = (type: string, onClose: () => void) => {
  const [values, setValues] = useState({ id: '', pw: '', pwCheck: '' });
  const [errors, setErrors] = useState({ id: '', pw: '', pwCheck: '', server: '' });
  const [idValue, setIdValue] = useState('')
  const [pwValue, setPwValue] = useState('')
  const [pwCheck, setPwCheck] = useState('');
  const setSession = useAuth(state => state.setSession);
  const setIsLoading = useLoading(state => state.setIsLoading);
  const openModal = useModalStore(state => state.openModal);

  // 유효성 검사
  const validate = () => {
    const newErrors = { id: '', pw: '', pwCheck: '', server: '' };
    let isValid = true;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const pwRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;


    if (!emailRegex.test(idValue)) {
      newErrors.id = '올바른 이메일 형식이 아닙니다.';
      isValid = false;
    }

    if (!pwRegex.test(pwValue)) {
      newErrors.pw = "비밀번호 형식이 올바르지 않습니다.";
      isValid = false;
    }

    if (type === 'register' && pwValue !== pwCheck) {
      newErrors.pwCheck = '비밀번호가 일치하지 않습니다.';
      isValid = false;
    }

    setErrors(newErrors);
    console.log(errors)
    return isValid;
  }

  const getKoreanErrorMessage = (msg: string) => {
    if (msg.includes('User already registered')) return '이미 가입된 이메일입니다.';
    return '인증 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
  }

  const handleAuth = async () => {
    setErrors({ id: '', pw: '', pwCheck: '', server: '' })

    if (!validate()) return;

    setIsLoading(true);

    try {
      if (type === 'register') {
        const displayName = idValue.split('@')[0];
        const { error } = await supabase.auth.signUp({
          email: idValue,
          password: pwValue,
          options: {
            data: {
              displayName
            }
          }
        });

        if (error) {
          console.log('Auth Register Error(useAuthForm) - ', error);
          setErrors(prev => ({ ...prev, server: getKoreanErrorMessage(error.message) }))
          setIsLoading(false);
          return;
        } else {
          setIsLoading(false);
          openModal('SIGNUP_COMPLETE');
          onClose();
        }
      } else if (type === 'login') {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: idValue,
          password: pwValue
        });

        if (error) {
          setIsLoading(false);
          console.log('Login Error(useAuthForm) - ', error);
          setErrors(prev => ({ ...prev, server: '아이디 혹은 비밀번호가 일치하지 않습니다.' }))
          return;
        } else {
          setIsLoading(false);
          setSession(data.session);
          onClose();
        }

      }
    } catch (e) {
      console.log("🚀 ~ handleAuth ~ e:", e)
      setErrors(prev => ({ ...prev, server: '네트워크 오류가 발생했습니다.' }));

    } finally {
      setIsLoading(false);
    }
  }
  return { idValue, setIdValue, pwValue, setPwValue, pwCheck, setPwCheck, errors, setErrors, handleAuth };
}