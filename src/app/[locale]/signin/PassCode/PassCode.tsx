import Box from '@mui/material/Box';
import { styles } from './styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import validateCode from './action';
import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useState } from 'react';
import Alert from '@/components/Alert/Alert';
import { useTranslations } from 'next-intl';

const SubmitButton = ({ isFormValid }: { isFormValid: boolean }) => {
  const { pending } = useFormStatus();
  const t = useTranslations('SignIn.PassCode');
  return (
    <Button
      variant="contained"
      sx={styles.submitButton}
      disabled={pending || !isFormValid}
      type="submit"
    >
      {t('submit')}
    </Button>
  );
};

const initialState = {
  isAuthorized: false,
  errorMessage: '',
  error: false,
};

export default function PassCode({
  setIsAuthorized,
}: {
  setIsAuthorized: (value: boolean) => void;
}) {
  const t = useTranslations('SignIn.PassCode');

  const [state, formAction] = useFormState(validateCode, initialState);
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  useEffect(() => {
    setIsCodeValid(code.length === 6);
    setIsEmailValid(email.includes('@') && email.includes('.'));
  }, [code, email]);

  const isFormValid = isCodeValid && isEmailValid;

  useEffect(() => {
    if (state.isAuthorized) {
      setIsAuthorized(true);
    }
  }, [state.isAuthorized, setIsAuthorized]);

  return (
    <Box sx={styles.container}>
      <form action={formAction} style={{ width: '100% ' }}>
        <Box sx={styles.textFieldsContainer}>
          <TextField
            label={t('code')}
            name="code"
            variant="outlined"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            sx={{ ...styles.textField, textTransform: 'uppercase' }}
            required
            type="text"
            slotProps={{
              htmlInput: {
                maxLength: 6,
                minLength: 6,
                style: { textTransform: 'uppercase' },
              },
            }}
          />
          <TextField
            label={t('email')}
            name="email"
            variant="outlined"
            type="email"
            sx={styles.textField}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            helperText={t('emailHelperText')}
          />
          <SubmitButton isFormValid={isFormValid} />
        </Box>
      </form>
      {state.error && (
        <Box sx={styles.alert}>
          <Alert messages={t('invalidCredentials')} />
        </Box>
      )}
    </Box>
  );
}
