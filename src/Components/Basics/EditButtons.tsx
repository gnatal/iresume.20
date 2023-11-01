import { TouchableOpacity } from "react-native";
// https://www.npmjs.com/package/@fortawesome/react-native-fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons/faPen";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";

export const ToggleEditButton = ({ className = "", Edit, ...props }) => (
  <TouchableOpacity className={`w-10 h-10 ${!Edit ? "bg-[#42A5F5]" : "bg-[#fb5b5a]"} rounded-full items-center justify-center ${className}`} {...props}>
    {!Edit ?
      <FontAwesomeIcon icon={faPen} color='white' size={20} /> :
      <FontAwesomeIcon icon={faXmark} color='white' size={20} />
    }
  </TouchableOpacity>
)
export const EditButton = ({ className = "", ...props }) => (
  <TouchableOpacity className={`w-8 h-8 bg-[#42A5F5] rounded-full items-center justify-center ${className}`} {...props}>
    <FontAwesomeIcon icon={faPen} color="white" />
  </TouchableOpacity>
)
export const CancelEditButton = ({ className = "", ...props }) => (
  <TouchableOpacity className={`w-8 h-8 bg-[#fb5b5a] rounded-full items-center justify-center ${className}`} {...props}>
    <FontAwesomeIcon icon={faXmark} color="white" />
  </TouchableOpacity>
)
export const AddInfoButton = ({ className = "", ...props }) => (
  <TouchableOpacity className={`w-8 h-8 bg-[#4DB6AC] rounded-full items-center justify-center ${className}`} {...props}>
    <FontAwesomeIcon icon={faPlus} color="white" />
  </TouchableOpacity>
)
