import gitHub_dark from "../assets/icon/grey_github.svg"
import gitHub from "../assets/icon/normal_github.svg"
import normal_copy from "../assets/icon/normal_copy.svg"
import yellow_copy from "../assets/icon/yellow_copy.svg"
import white_copy from "../assets/icon/white_copy.svg"
import normal_like from "../assets/icon/normal_like.svg"
import yellow_like from "../assets/icon/yellow_like.svg"
import white_like from "../assets/icon/white_like.svg"

const main = {
    defautText : "Enter website ...",
    normal_text : ["#282B2D", '2px'],
    unselect_text : ["#777777", '1px'],
    color_disable : ["#A6A6A6", "#FB9B3B"],
    color_submit_bt : ["#FB9B3B","#CA7D31"],
    color_disable_bt : ["#A6A6A6", "#CA7D31"],
    color_enable_bt : ["#FB9B3B","#CA7D31"],
    git_icon : [[gitHub, "#E8E8E8"], [gitHub_dark, "#777777"]],
    copy_icon : [[normal_copy, "#f7f7f7"], [normal_copy, "#f7f7f7"]],
    like_icon : [[normal_like, "#f7f7f7"], [normal_like, "#f7f7f7"]],
    copy_disable_bt : [[normal_copy, "#f7f7f7"], [normal_copy, "#f7f7f7"]],
    like_disable_bt : [[normal_like, "#f7f7f7"], [normal_like, "#f7f7f7"]],
    copy_enable_bt : [[yellow_copy, "#FFEFDF"], [white_copy, "#FFE0C2"]],
    like_enable_bt : [[yellow_like, "#FFEFDF"], [white_like, "#FFE0C2"]],
    sum_box : [["#f7f7f7", "#777777"], ["#FFEFDF", "#FB9B3B"]],
    extra_bt : ["#FFE0C2", "white"],
}

export {main};