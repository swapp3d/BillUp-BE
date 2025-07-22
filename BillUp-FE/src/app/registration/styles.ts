import { SxProps } from '@mui/material';

export const MainBox: SxProps = {
    mt: 20,
    gap: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
};

export const ButtonStyle: SxProps = {
    borderRadius: '20px',
    backgroundColor: 'black',
    textTransform: 'none'
};

export const ProfileImageContainer: SxProps = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem'
};

export const ProfileImageUpload: SxProps = {
    width: '150px',
    height: '150px',
    cursor: 'pointer',
    '& img': {
        transition: 'filter 1s ease'
    },
    '&:hover img': {
        filter: 'grayscale(100%)'
    }
};

export const FormBottomSection: SxProps = {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    mt: 2
};

export const SuggestionBox: SxProps = {
    display: 'flex',
    alignItems: 'center',
    gap: 1
};

export const ImageUploadSuggestionBox: SxProps = {
    display: 'flex',
    alignItems: 'center'
};

export const DeleteImageButton: SxProps = {
    color: 'gray',
    textTransform: 'none'
};

export const RegistrationForm: SxProps = {
    height: '100vh'
};
