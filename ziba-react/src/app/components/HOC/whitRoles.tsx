import { UserContext } from '@/app/context/user.context';
import { useRouter } from 'next/navigation'
import { useContext } from 'react';


function hasRequiredPermissions(requiredPermissions: string, userPermissions: string|undefined): boolean {

  //Chequea si el rol del usuario es el requerido.
  return requiredPermissions == userPermissions;
}

export function withRoles (Component: any, requiredPermissions: string,goBackRoute: string) {
  return function WithRolesWrapper(props: any) {
    const router = useRouter();
    const {userData} = useContext(UserContext);

    const hasPermission = hasRequiredPermissions(requiredPermissions, userData?.role)
    if (hasPermission) {
      return <Component {...props} />
    } else {
      router.push(goBackRoute)
      return null
    }
  }
}