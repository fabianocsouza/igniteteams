import { TouchableOpacityProps } from 'react-native';
import { MaterialIcons } from  '@expo/vector-icons';

import { ButtonIconTypeStylesProps, Container, Icon } from './styles';

type Props = TouchableOpacityProps & {
  icon: keyof typeof MaterialIcons.glyphMap;
  type?: ButtonIconTypeStylesProps;
}

export const ButtonIcon = ({ icon, type = 'PRIMARY', ...rest }: Props) => {
  return(
    <Container {...rest}>
      <Icon  
        name={icon} 
        type={type}
      />
    </Container>
  )
}