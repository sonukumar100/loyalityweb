import { Button } from 'app/components/ui/button';
import { useGlobalSlice } from 'app/slice';
import { useDispatch } from 'react-redux';

export function Logout() {
    const dispatch = useDispatch();
    const { actions: globalActions } = useGlobalSlice();
    const logout = () => {
        dispatch(globalActions.clearUser());
        localStorage.clear()
        window.location.href = '/login';
    }
    return (
        <>
            <Button
                onClick={logout}
                variant="whiteBtn"
                type="button"
                className="font-poppins font-base font-normal rounded-80 text-base py-5 px-8 mt-8 ml-8"
            >
                Logout
            </Button>
        </>

    )

}