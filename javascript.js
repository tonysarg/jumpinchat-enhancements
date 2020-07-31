var body = document.body

// ------------------------------------ DELAY FOR ELEMENTS TO LOAD ------------------------------------*/
var starter = "activate"
if (starter !== "start_delay") {
  setTimeout(Start_The_Plus, 3000)
}

// ------------------------------------ START THE PLUS ----------------------------------------------*/
function Start_The_Plus () {
  var loc = window.location.toString()
  var pageName = loc.split("/")[3]
  if (pageName !== "" && pageName !== "directory" && pageName !== "support" && pageName !== "profile" && pageName !== "messages" && pageName !== "settings") {
    Create_Element_IDs()
    Create_Top_Icons()
    Create_Bottom_Icons()

    Create_Top_Setting_Box()

    Create_Plus_Window()
    Load_Draggables()

    Create_Chat_Settings()
    Create_Cam_Settings()
    Create_Theme_Settings()
    Create_BG_Settings()

    Create_Cheers()

    Create_Exit_Box()

    Create_Plus_Info()
    Create_Header_Hider()

    Add_Listeners()

    Reload_User_Settings()
  }
}

// ------------------------------------ LOAD : REGULAR VARIABLES -------------------------------------*/
var theme_status = localStorage.getItem("thememode")
var user_button_settings = ["miniyt"]
var top_buttons = ["theme"]
var button_actions = ["miniyt", "save", "reset",
  "tiny", "min", "max", "res", "close"]
var menu_actions = ["chat", "cam", "theme", "notice"]



// ------------------------------------ LOAD : INSTANTLY THEME COLORS OR CUSTOM MODE ---------*/
Create_Custom_Mode()
if (theme_status) {
  body.classList.add("thememode")
  if (theme_status === "custom") {
    var existing_colors = localStorage.getItem("plus_custom_bgcolor")
    if (existing_colors) {
      Save_Plus_Color("reset")
    } else {
      Save_Plus_Color("save")
    }
  } else {
    Toggle_Theme(theme_status)
  }
}

// ------------------------------------ RELOAD : USER SETTINGS ------------------------------*/
function Reload_User_Settings () {
  user_checkbox_settings.forEach(function (user_checkbox_setting) {
    var storage = localStorage.getItem("plus_" + user_checkbox_setting)
    if (storage) {
      body.classList.add(user_checkbox_setting)
      document.getElementById("plus_" + user_checkbox_setting + "_checkbox").checked = true
    }
  })
  user_button_settings.forEach(function (user_button_setting) {
    var storage = localStorage.getItem("plus_" + user_button_setting)
    if (storage) {
      body.classList.add(user_button_setting)
    }
  })

  // ------- USER BG COLOR -------
  var bgstorage = localStorage.getItem("plus_override_user_bg")
  if (bgstorage !== "") {
    var bgstoragesrc = localStorage.getItem("plus_user_bgcolorsrc")
    document.getElementById("plus_clear_user_bgcolorsrc").value = bgstoragesrc
    Save_User_BG_Color("save")
  }

  // ------- USER BG IMAGES -------
  var cambg_status = localStorage.getItem("plus_clear_cambg_reload")
  var chatbg_status = localStorage.getItem("plus_clear_chatbg_reload")
  var userbg_status = localStorage.getItem("plus_clear_userbg_reload")
  if (cambg_status || chatbg_status || userbg_status) {
    document.getElementById("plus_clear_cambg").value = cambg_status
    document.getElementById("plus_clear_userbg").value = chatbg_status
    document.getElementById("plus_clear_chatbg").value = userbg_status
    Save_User_BG()
  }

  // ------- USERNAME COLOR -------
  var usernamecolor_status = localStorage.getItem("plus_username_color")
  if (usernamecolor_status) {
    document.getElementById("plus_clear_usercolorsrc").value = usernamecolor_status
    Save_Username_Color("save")
  }

  // ------- CHAT COLOR -------
  var chatcolor_status = localStorage.getItem("plus_chat_color")
  if (chatcolor_status) {
    document.getElementById("plus_clear_chatcolorsrc").value = chatcolor_status
    Save_Chat_Color("save")
  }
}

// ------------------------------------ CREATE : ELEMENT IDS ----------------------------*/
function Create_Element_IDs () {
  var chatInputBox = document.getElementsByClassName("chat__Input")[0]
  chatInputBox.id = "chat_input_box"
  chatInputBox.setAttribute("autocomplete", "off")

  var btm_bar = document.getElementsByClassName("chat__Share")[0]
  btm_bar.id = "bottom_bar"

  var chat_drag = document.getElementsByClassName("chat")[0]
  chat_drag.id = "chat"

  var up_bar = document.getElementsByClassName("chat__HeaderOptions")[1]
  up_bar.id = "chat__HeaderOptions"

  var info = document.getElementsByClassName("roomHeader__UserActions")[0]
  info.id = "info_box"

  var chat_box = document.getElementsByClassName("chat__InputWrapper")[0]
  chat_box.id = "chat_box"
}

// ------------------------------------ ACTION : TOP BAR ACTION -----------------------------*/
function Top_Bar_Action (type) {
  menu_actions.forEach(function (menu_action) {
    if (menu_action !== type) {
      body.classList.toggle("open_plus_" + type)
      body.classList.remove("open_plus_" + menu_action)
      var current_theme_selected = localStorage.getItem("thememode")
      var custom_status = localStorage.getItem("custom_box_status")
      if (type === "theme" && current_theme_selected === "custom" && custom_status === "open") {
        Toggle_Custom_Box("off")
        localStorage.setItem("custom_box_status", "closed")
      } else if (type === "theme" && current_theme_selected === "custom" && custom_status === "closed") {
        Toggle_Custom_Box("on")
        localStorage.setItem("custom_box_status", "open")
      } else {
        Toggle_Custom_Box("off")
        localStorage.setItem("custom_box_status", "closed")
      }

      if (type === "notice") {
        var info_frame = document.getElementById("HW_JL_frame")
        var home = "https://headway-widget.net/widgets/7XkGbx"
        info_frame.src = home
      }
    }
  })
}

// ------------------------------------ ACTION : BOTTOM BAR ACTION --------------------------*/
function Bottom_Bar (type) {
  if (type === "miniyt") {
    body.classList.toggle("")
  }
}

// ------------------------------------ ACTION : SAVE USERNAME COLOR -------------------------*/
function Save_User_BG_Color (type) {
  if (type === "save") {
    body.classList.add("userbg_color")
    var usercolor_plus = document.getElementById("plus_clear_user_bgcolorsrc").value
    document.documentElement.style.setProperty("--thememode-user_bgcolor", usercolor_plus)
    localStorage.setItem("plus_user_bgcolorsrc", usercolor_plus)
  } else if (type === "reset") {
    body.classList.remove("userbg_color")
    document.documentElement.style.setProperty("--thememode-user_bgcolor", "")
    document.getElementById("plus_user_bgcolorsrc").value = ""
    document.documentElement.style.setProperty("--thememode-user_bgcolor", "")
    localStorage.setItem("plus_user_bgcolorsrc", "")
  } else if (type === "open") {
    body.classList.toggle("userbg_color")
  }
}

// ------------------------------------ ACTION : SAVE USERNAME COLOR -------------------------*/
function Save_Username_Color (type) {
  if (type === "save") {
    var usercolor_plus = document.getElementById("plus_clear_usercolorsrc").value
    document.documentElement.style.setProperty("--thememode-usernamecolor", usercolor_plus)
    body.classList.add("usercolor")
    localStorage.setItem("plus_username_color", usercolor_plus)
  } else if (type === "reset") {
    body.classList.remove("usercolor")
    document.documentElement.style.setProperty("--thememode-usernamecolor", "")
    document.getElementById("plus_clear_usercolorsrc").value = ""
    document.documentElement.style.setProperty("--thememode-usernamecolor", "")
    localStorage.setItem("plus_username_color", "")
  }
}

// ------------------------------------ ACTION : SAVE CHAT COLOR -------------------------*/
function Save_Chat_Color (type) {
  if (type === "save") {
    var chatcolor_plus = document.getElementById("plus_clear_chatcolorsrc").value
    document.documentElement.style.setProperty("--thememode-chatcolor", chatcolor_plus)
    body.classList.add("chat_color")
    localStorage.setItem("plus_chat_color", chatcolor_plus)
  } else if (type === "reset") {
    body.classList.remove("chat_color")
    document.documentElement.style.setProperty("--thememode-chatcolor", "")
    document.getElementById("plus_clear_chatcolorsrc").value = ""
    document.documentElement.style.setProperty("--thememode-chatcolor", "")
    localStorage.setItem("plus_chat_color", "")
  }
}

// ------------------------------------ ACTION : SAVE CUSTOM COLORS -------------------------*/
function Save_Plus_Color (type) {
  localStorage.setItem("thememode", "custom")
  var bgcolor_plus = document.getElementById("plus_bgcolor").value
  var bordercolor_plus = document.getElementById("plus_bordercolor").value
  var lightbgcolor_plus = document.getElementById("plus_lightbgcolor").value
  var textcolor_plus = document.getElementById("plus_textcolor").value
  var buttontext_plus = document.getElementById("plus_buttontext").value
  var userlist_plus = document.getElementById("plus_userlist").value

  document.documentElement.style.setProperty("--thememode-bgcolor", bgcolor_plus)
  document.documentElement.style.setProperty("--thememode-bordercolor", bordercolor_plus)
  document.documentElement.style.setProperty("--thememode-lightbgcolor", lightbgcolor_plus)
  document.documentElement.style.setProperty("--thememode-textcolor", textcolor_plus)
  document.documentElement.style.setProperty("--thememode-buttontext", buttontext_plus)
  document.documentElement.style.setProperty("--thememode-userlist", userlist_plus)

  if (type === "save") {
    localStorage.setItem("plus_custom_bgcolor", bgcolor_plus)
    localStorage.setItem("plus_custom_bordercolor", bordercolor_plus)
    localStorage.setItem("plus_custom_lightbgcolor", lightbgcolor_plus)
    localStorage.setItem("plus_custom_textcolor", textcolor_plus)
    localStorage.setItem("plus_custom_buttontext", buttontext_plus)
    localStorage.setItem("plus_custom_userlist", userlist_plus)
  } else if (type === "reset") {
    var stored_bgcolor = localStorage.getItem("plus_custom_bgcolor")
    var stored_bordercolor = localStorage.getItem("plus_custom_bordercolor")
    var stored_lightbgcolor = localStorage.getItem("plus_custom_lightbgcolor")
    var stored_textcolor = localStorage.getItem("plus_custom_textcolor")
    var stored_buttontext = localStorage.getItem("plus_custom_buttontext")
    var stored_userlist = localStorage.getItem("plus_custom_userlist")
    document.documentElement.style.setProperty("--thememode-bgcolor", stored_bgcolor)
    document.documentElement.style.setProperty("--thememode-bordercolor", stored_bordercolor)
    document.documentElement.style.setProperty("--thememode-lightbgcolor", stored_lightbgcolor)
    document.documentElement.style.setProperty("--thememode-textcolor", stored_textcolor)
    document.documentElement.style.setProperty("--thememode-buttontext", stored_buttontext)
    document.documentElement.style.setProperty("--thememode-userlist", stored_userlist)
    document.getElementById("plus_bgcolor").value = stored_bgcolor
    document.getElementById("plus_bordercolor").value = stored_bordercolor
    document.getElementById("plus_lightbgcolor").value = stored_lightbgcolor
    document.getElementById("plus_textcolor").value = stored_textcolor
    document.getElementById("plus_buttontext").value = stored_buttontext
    document.getElementById("plus_userlist").value = stored_userlist
    document.documentElement.style.setProperty("--thememode-roombg", "")
    document.documentElement.style.setProperty("--thememode-userbg", "")
    document.documentElement.style.setProperty("--thememode-chatheaderbg", "")
    document.documentElement.style.setProperty("--thememode-chatbg", "")
    document.documentElement.style.setProperty("--thememode-messagebg", "")
  }
}

// ------------------------------------ ACTION : BUTTONS ------------------------------------*/
function Button_Action (type) {
  var storage = "plus_" + type
  var storage_status = localStorage.getItem(storage)
  var loc = window.location.toString()
  var params = loc.split("/")[3]
  var iframe = document.getElementById("game_list")

  var string = type
  var firstUnderscore = string.indexOf("_")
  var secondUnderscore = string.indexOf("_", firstUnderscore + 1)
  var clear = [string.substring(5, secondUnderscore)]


  if (storage_status !== type) {
    localStorage.setItem(storage, type)
  } else {
    localStorage.setItem(storage, "")
  }
  if (type === "miniyt") {
    body.classList.toggle(type)
  } else if (type === "popchat" || type === "poprestore") {
    body.classList.toggle("popchat")
  } else if (type === "hide_header") {
    body.classList.toggle(type)
  } else if (type === "save" || type === "reset") {
    Save_Plus_Color(type)
  } else if (type === "web" || type === "hideweb") {
    body.classList.toggle("web")
  } else if (type === "games") {
    var home = "https://smokeyplus.com/game_time/main/game/web_window.php"
    iframe.src = home
  } else if (type === "tiny") {
    var tc = "https://tinychat.com/room/"
    iframe.src = tc + params
  } else if (type === "min" || type === "max" || type === "res") {
    Window_Controls(type)
  } else if (type === "close") {
    body.classList.toggle("web")
    iframe.src = ""
  } else if (clear == "clear") {
    if (type === "clear_usercolor") {
      Save_Username_Color("reset")
    } else {
      Clear_User_BG(type)
    }
  } else if (type === "apply_images") {
    Save_User_BG()
  } else if (type === "apply_colors") {
    Save_Username_Color("save")
  } else if (type === "apply_chat_color") {
    Save_Chat_Color("save")
  } else if (type === "apply_bgcolors") {
    Save_User_BG_Color("save")
  } else if (type === "cambg_settings" || type === "chatbg_settings" || type === "userbg_settings") {
    USER_BG_MINI_MENU(type)
  }
}

// ------------------------------------ ACTION : MINI MENU USER BGS -----------------------------*/
function USER_BG_MINI_MENU (type) {
  var user_settings = ["cambg_settings", "chatbg_settings", "userbg_settings"]
  user_settings.forEach(function (user_setting) {
    if (user_setting === type) {
      body.classList.toggle(type)
    } else {
      body.classList.remove(user_setting)
    }
  })
}

// ------------------------------------ ACTION : CLEAR USER BGS -----------------------------*/
function Clear_User_BG (type) {
  var bgelement = "plus_" + type + "bg"
  var bgvar = "--plus_" + type + "bg-image"
  var bgreload = "plus_" + type + "bg_reload"
  var bg = "plus_" + type + "bg"

  document.getElementById(bgelement).value = ""
  document.documentElement.style.setProperty(bgvar, "")
  localStorage.setItem(bgreload, "")
  localStorage.setItem(bg, "")
}

// ------------------------------------ ACTION : SAVE USER BGS ------------------------------*/
function Save_User_BG () {
  var bgs = ["userbg", "chatbg", "cambg"]

  bgs.forEach(function (bg) {
    var save_bgelement = "plus_clear_" + bg
    var save_bgvar = "--plus_clear_" + bg + "-image"
    var save_bgreload = "plus_clear_" + bg + "_reload"
    var save_bg = "plus_clear_" + bg
    var plus_bginput = document.getElementById(save_bgelement).value

    if (plus_bginput !== "") {
      var plus_bginput_url = "url(" + plus_bginput + ")"
      document.documentElement.style.setProperty(save_bgvar, plus_bginput_url)
      localStorage.setItem(save_bgreload, plus_bginput)
      localStorage.setItem(save_bg, plus_bginput_url)
    } else {
      document.documentElement.style.setProperty(save_bgvar, "")
      localStorage.setItem(save_bgreload, "")
      localStorage.setItem(save_bg, "")
    }
  })
}

// ------------------------------------ ACTION : PLUS WINDOW -------------------------------*/
function Window_Controls (type) {
  if (type === "max") {
    document.getElementById("window_title").setAttribute("style", "margin-right: 150px;display:inline-block;")
    document.getElementById("iframe_box").style.display = ""
    document.getElementById("plus_max").style.display = "none"
    document.getElementById("mydiv").style.height = "605px"
    document.getElementById("plus_res").style.display = "inline"
  } else if (type === "min") {
    document.getElementById("window_title").style.display = "none"
    document.getElementById("iframe_box").style.display = "none"
    document.getElementById("mydiv").style.width = "221px"
    document.getElementById("plus_max").style.display = "none"
    document.getElementById("plus_min").style.display = "none"
    document.getElementById("plus_res").style.display = "inline"
    document
      .getElementById("mydiv")
      .setAttribute("style", "left:0px; top:90.4%; height:29px; border-bottom-right-radius: 0px;border-bottom-left-radius: 0px; -webkit-box-shadow: none;-moz-box-shadow: none;box-shadow: none;")
  } else if (type === "res") {
    document.getElementById("window_title").setAttribute("style", "margin-right: 150px;display:inline-block;")
    document.getElementById("iframe_box").style.display = ""
    document.getElementById("mydiv").setAttribute("style", "left:20px; top:10%;")
    document.getElementById("mydiv").style.height = ""
    document.getElementById("plus_max").style.display = "inline"
    document.getElementById("plus_min").style.display = "inline"
    document.getElementById("plus_res").style.display = "none"
  }
}

// ------------------------------------ ACTION : CHECKBOX -----------------------------------*/
function Checkbox_Action (type) {
  var storage = "plus_" + type
  var storage_status = localStorage.getItem(storage)
  var checkbox = "plus_" + type + "_checkbox"
  if (storage_status !== type) {
    localStorage.setItem(storage, type)
    document.getElementById(checkbox).checked = true
  } else {
    localStorage.setItem(storage, "")
    document.getElementById(checkbox).checked = false
  }
  if (type === "bubble" || type === "robo" || type === "hide_chat" || type === "hide_userlist") {
    body.classList.toggle(type)
  } else if (type === "ltr" || type === "cheers" || type === "border" || type === "spacing" || type === "rounded_cams") {
    body.classList.toggle(type)
  } else if (type === "cambg_cover" || type === "cambg_center" || type === "cambg_repeat") {
    body.classList.toggle(type)
  } else if (type === "chatbg_cover" || type === "chatbg_repeat" || type === "chatbg_center") {
    body.classList.toggle(type)
  } else if (type === "userbg_cover" || type === "userbg_repeat" || type === "userbg_center") {
    body.classList.toggle(type)
  } else if (type === "user_bg" || type === "trans_chat" || type === "trans_users" || type === "hide_usernames") {
    body.classList.toggle(type)
  } else if (type === "user_bgcolor") {
    Save_User_BG_Color("open")
  } else if (type === "override_chatcolor" || type === "override_username") {
    body.classList.toggle(type)
  } else if (type === "override_user_bgcolor") {
    body.classList.toggle(type)
    Save_User_BG_Color("save")
  } else if (type === "hide_emojis") {
    body.classList.toggle(type)
  }
}

// ------------------------------------ ACTION : CHEERS BUTTON ------------------------------*/
function Cheers_Button () {
  var text = document.getElementById("chat_input_box")
  var cheers_status = localStorage.getItem("cheers_status")
  if (!cheers_status) {
    text.value = "!cheers"
    localStorage.setItem("cheers_status", "1")
  }
  if (cheers_status === "1") {
    text.value = "MEGA CHEERS!"
    localStorage.setItem("cheers_status", "2")
  }
  if (cheers_status === "2") {
    text.value = "▂▅▇ 🔥 CHEERS 🔥 ▇▅▂"
    localStorage.setItem("cheers_status", "")
  }
  setTimeout(Reset_Cheers_Button, 10000)
}

function Reset_Cheers_Button () {
  localStorage.removeItem("cheers_status")
}

// ------------------------------------ ACTION : CUSTOM MODE CHOICE -------------------------*/
function Toggle_Custom_Box (status) {
  if (status === "on") {
    body.classList.add("custom")
  } else {
    body.classList.remove("custom")
  }
}

// ------------------------------------ CREATE : EVENT LISTENERS ----------------------------*/
function Add_Listeners () {
  document.getElementById("info_box").addEventListener("click", Bottom_Bar, false)

  document.getElementById("Cheers_Button").addEventListener("click", function () {
    Cheers_Button()
  }, false)

  btmbuttons.forEach(function (btmbutton) {
    var btm_btn = "plus_" + btmbutton
    document.getElementById(btm_btn).addEventListener("click", function () {
      Bottom_Bar(btmbutton)
    }, false)
  }
  )
  top_buttons.forEach(function (top_button) {
    var top_btn = "plus_" + top_button
    document.getElementById(top_btn).addEventListener("click", function () {
      Top_Bar_Action(top_button)
    }, false)
  }
  )
  checkbox_actions.forEach(function (checkbox_action) {
    var checkbox_action_element = "plus_" + checkbox_action
    document.getElementById(checkbox_action_element).addEventListener("click", function () {
      Checkbox_Action(checkbox_action)
    }, false)
  })
  button_actions.forEach(function (button_action) {
    var button_action_element = "plus_" + button_action
    document.getElementById(button_action_element).addEventListener("click", function () {
      Button_Action(button_action)
    }, false)
  }
  )
  document.getElementById("Exit_Box").addEventListener("click", function () {
    Exit_Box_Action()
  }, false)
}

// ------------------------------------ CREATE : PLUS WINDOW -------------------------------*/
function Create_Plus_Window () {
  var Plus_Window = document.createElement("div")
  Plus_Window.innerHTML = `
<style>
body.plus_window {overflow:hidden;}
</style>
<div id="mydiv" style="display:none;">
<div id="mydivheader">

<div id="game_head" class="game_head">
<div id ="window_title" class="window_title" style="display: inline-block; margin-right: 150px;">Plus Window</div>

<div id="control_grp" class="">
<div id="plus_min" class="tube_btn" style="" title="Minimize">
<i class="fas fa-window-minimize"></i>
</div>

<div id="plus_res" class="tube_btn" style="padding:0px;" title="Restore Hover Effect">
<i class="far fa-window-restore"></i>
</div>

<div id="plus_max" class="tube_btn" style="padding:0px;" title="Maximize/Lock Open">
<i class="fas fa-window-maximize"></i>
</div>

<div id="plus_close" class="tube_btn" style="padding:0px;" title="Close">
<i class="far fa-window-close"></i>
</div>
</div>

</div>

</div>
<div id="iframe_box">
<div id="container2">
<iframe src="" class="scrollingContainer" id="game_list"  name="" style="border:0px;width: 105%;overflow-x: hidden;height: 95%;" scrolling="yes" allow="autoplay; microphone; camera"></iframe>
</div>
</div>
</div>

<div id="toggle_menu" style="background-color:transparent !important;border-color:transparent !important;"></div>
`
  Plus_Window.setAttribute("id", "plus_window")
  document.body.appendChild(Plus_Window)
}

// ------------------------------------ CREATE : CUSTOM MODE --------------------------------*/
function Create_Custom_Mode () {
  var Custom_Mode = document.createElement("div")

  Custom_Mode.innerHTML = `
<div class="dropdown__Options" id="Plus_Custom">
<div class="dropdown__Option dropdown__Option-header">Custom Settings</div>
            <span class="dropdown__Option">
                <span>Bar Colors</span>
                <input type="color" name="colorpicker" id="plus_bgcolor" value="#22ADD5" style="width: 20px;border-radius: 3px;height: 18px;padding: 0px;" onchange="Save_Plus_Color()"></input>
            </span>
            <span class="dropdown__Option">
                <span>Button Color</span>
                <input type="color" name="colorpicker" id="plus_bordercolor" value="#C7CFD9" style="width: 20px;border-radius: 3px;height: 18px;padding: 0px;" onchange="Save_Plus_Color()"></input>
            </span>
            <span class="dropdown__Option">
                <span>Background Color</span>
                <input type="color" name="colorpicker" id="plus_lightbgcolor" value="#FFFFFF" style="width: 20px;border-radius: 3px;height: 18px;padding: 0px;" onchange="Save_Plus_Color()"></input>
            </span>
            <span class="dropdown__Option">
                <span>Text Color</span>
                <input type="color" name="colorpicker" id="plus_textcolor" value="#C7CFD9" style="width: 20px;border-radius: 3px;height: 18px;padding: 0px;" onchange="Save_Plus_Color()"></input>
            </span>
            <span class="dropdown__Option">
                <span>Button Text</span>
                <input type="color" name="colorpicker" id="plus_buttontext" value="#000000" style="width: 20px;border-radius: 3px;height: 18px;padding: 0px;" onchange="Save_Plus_Color()"></input>
            </span>
            <span class="dropdown__Option">
                <span>Userlist Text</span>
                <input type="color" name="colorpicker" id="plus_userlist" value="#000000" style="width: 20px;border-radius: 3px;height: 18px;padding: 0px;" onchange="Save_Plus_Color()"></input>
            </span>

            <span class="dropdown__Option no_hoverbg">
                <input id="plus_reset" type="button" style="background: #5a6370;color: #fff;border:0px;cursor:pointer;border-radius: 10px;width: 150px;" value="RESET"/>
                </span>
            <span class="dropdown__Option no_hoverbg">
                <input id="plus_save" type="button" style="background: #5a6370;color: #fff;border:0px;cursor:pointer;border-radius: 10px;width: 100%;" value="SAVE"></input>
            </span>
</div>
`
  Custom_Mode.setAttribute("id", "Custom_Mode")
  Custom_Mode.setAttribute("style", "display:none;")
  document.body.appendChild(Custom_Mode)
}

// ------------------------------------ CREATE : CHEERS ELEMENT -----------------------------*/
function Create_Cheers () {
  var cheers_btn = document.createElement("div")
  cheers_btn.className = "button-clear chat__InputAction"
  cheers_btn.setAttribute("id", "Cheers_Button")
  cheers_btn.setAttribute("type", "button")
  cheers_btn.innerHTML = `
<i class="fas fa-joint"></i>
`
  chat_box.appendChild(cheers_btn)
}

// ------------------------------------ CREATE : EXIT BOX -----------------------------------*/
function Create_Exit_Box () {
  var exit_box = document.createElement("div")
  exit_box.className = ""
  exit_box.setAttribute("id", "Exit_Box")
  exit_box.innerHTML = ""
  document.body.appendChild(exit_box)
}

// ------------------------------------ ACTION : EXIT BOX -----------------------------------*/
function Exit_Box_Action () {
  Toggle_Custom_Box("off")
  localStorage.setItem("custom_box_status", "closed")
  menu_actions.forEach(function (menu_action) {
    body.classList.remove("open_plus_" + menu_action)
  })
}

// ------------------------------------ CREATE : TOP SETTINGS OUTER BOX ---------------------*/
function Create_Top_Setting_Box () {
  var chat_menu = document.createElement("div")
  chat_menu.className = ""
  chat_menu.setAttribute("id", "PlusOptions_Box")
  chat_menu.setAttribute(
    "style",
    "display: block; top: 95px; position: absolute; right: 11px; border-radius: 3px; z-index: 2000;"
  )
  chat_menu.innerHTML = ""
  document.body.appendChild(chat_menu)
}

// ------------------------------------ CREATE : CHAT SETTINGS ------------------------------*/
function Create_Chat_Settings () {
  var option_box = document.getElementById("PlusOptions_Box")
  var chat_menu = document.createElement("div")
  chat_menu.className = ""
  chat_menu.setAttribute("id", "plus_chat_settings")
  chat_menu.innerHTML = `
<div class="dropdown__Options">
<div class="dropdown__Option dropdown__Option-header">Chat settings</div>
<span class="dropdown__Option" id="plus_robo">Roboto Font<input id="plus_robo_checkbox" class="jic-checkbox" type="checkbox"></span>
<span class="dropdown__Option" id="plus_bubble">Bubble Chat<input id="plus_bubble_checkbox" class="jic-checkbox" type="checkbox"></span>
<span class="dropdown__Option" id="plus_cheers">Cheers Button<input id="plus_cheers_checkbox" class="jic-checkbox" type="checkbox"></span>
<span class="dropdown__Option" id="plus_override_chatcolor">Custom Chat Color<input id="plus_override_chatcolor_checkbox" class="jic-checkbox" type="checkbox"></span>
<span class="dropdown__Option sub_plus" id="plus_chat_color">
<span style="">Chat Color</span><input type="color" name="colorpicker" value="#000000" onchange="Button_Action('apply_chat_color')" id="plus_clear_chatcolorsrc" style="opacity: 1;cursor: pointer; width: 20px;height:20px;border-radius: 2px;padding: 0px;"/>
</span>
</div>

<div class="dropdown__Options" style="margin-top: 5px;">
<div class="dropdown__Option dropdown__Option-header">Hide Elements</div>
<span class="dropdown__Option" id="plus_hide_chat">Chatbox<input id="plus_hide_chat_checkbox" class="jic-checkbox" type="checkbox"></span>
<span class="dropdown__Option" id="plus_hide_userlist">Userlist<input id="plus_hide_userlist_checkbox" class="jic-checkbox" type="checkbox"></span>
<span class="dropdown__Option" id="plus_hide_emojis">Emoji/Gift<input id="plus_hide_emojis_checkbox" class="jic-checkbox" type="checkbox"></span>
</div>`
  option_box.appendChild(chat_menu)
}

// ------------------------------------ CREATE : CAM SETTINGS -------------------------------*/
function Create_Cam_Settings () {
  var option_box = document.getElementById("PlusOptions_Box")
  var cam_menu = document.createElement("div")
  cam_menu.className = ""
  cam_menu.setAttribute("id", "plus_cam_settings")
  cam_menu.innerHTML = `
<div class="dropdown__Options">
<div class="dropdown__Option dropdown__Option-header">Cam Settings</div>

<span class="dropdown__Option" id="plus_rounded_cams">Rounded Cams<input id="plus_rounded_cams_checkbox" class="jic-checkbox" type="checkbox"></span>
<span class="dropdown__Option" id="plus_override_username">Custom Name Color<input id="plus_override_username_checkbox" class="jic-checkbox" type="checkbox"></span>

<span class="dropdown__Option sub_plus" id="plus_username_color">
<span style="">Username Color</span><input type="color" name="colorpicker" value="#000000" onchange="Button_Action('apply_colors')" id="plus_clear_usercolorsrc" style="opacity: 1;cursor: pointer; width: 20px;height:20px;border-radius: 2px;padding: 0px;"/>
</span>
</div>

<div class="dropdown__Options" style="margin-top: 5px;">
<div class="dropdown__Option dropdown__Option-header">Hide Cam Elements</div>
<span class="dropdown__Option" id="plus_border">Borders<input id="plus_border_checkbox" class="jic-checkbox" type="checkbox"></span>
<span class="dropdown__Option" id="plus_spacing">Spacing<input id="plus_spacing_checkbox" class="jic-checkbox" type="checkbox"></span>
<span class="dropdown__Option" id="plus_hide_usernames">Usernames<input id="plus_hide_usernames_checkbox" class="jic-checkbox" type="checkbox"></span>
</div>
`
  option_box.appendChild(cam_menu)
}

// ------------------------------------ CREATE : THEME SETTINGS -----------------------------*/
function Create_Theme_Settings () {
  var option_box = document.getElementById("PlusOptions_Box")
  var theme_menu = document.createElement("div")
  theme_menu.className = ""
  theme_menu.setAttribute("id", "plus_theme_settings")
  theme_menu.innerHTML = `
<div class="dropdown__Options">
<div class="dropdown__Option dropdown__Option-header">Preset Themes</div>
<label class="dropdown__Option no_hoverbg">
<div class="color_square default_mode" onclick="Toggle_Theme('default')" title="default" style="width: 100%;border-radius:20px;">
<span style="position: relative; top: 3px;">Default
</span></div>
</label>
<label class="dropdown__Option no_hoverbg">
<div class="color_square pink_mode" onclick="Toggle_Theme('pink')" title="pink"></div>
<div class="color_square green_mode" onclick="Toggle_Theme('green')" title="green"></div>
<div class="color_square blue_mode" onclick="Toggle_Theme('blue')" title="blue"></div>
<div class="color_square mauve_mode" onclick="Toggle_Theme('mauve')" title="mauve"></div>
<div class="color_square orange_mode" onclick="Toggle_Theme('orange')" title="orange"></div>
<div class="color_square red_mode" onclick="Toggle_Theme('red')" title="red"></div>
</label>
<label class="dropdown__Option no_hoverbg">
<div class="color_square purple_mode" onclick="Toggle_Theme('purple')" title="purple"></div>
<div class="color_square black_mode" onclick="Toggle_Theme('black')" title="matte black"></div>
<div class="color_square buds_mode" onclick="Toggle_Theme('buds')" title="buds"></div>
<div class="color_square splat_mode" onclick="Toggle_Theme('splat')" title="splat"></div>
<div class="color_square tech_mode" onclick="Toggle_Theme('tech')" title="tech"></div>
</label>
<label class="dropdown__Option no_hoverbg">
<div class="color_square cust_mode" onclick="Toggle_Theme('custom')" title="custom" style="width: 100%;border-radius:20px;">
<span style="position: relative; top: 3px;">Custom Mode
<span class="on">ON</span>
<span class="off">OFF</span>
</span>
</div>
</label>
</div>

<div class="dropdown__Options" style="margin-top:5px;">
<div class="dropdown__Option dropdown__Option-header">Theme Settings</div>
<span class="dropdown__Option" id="plus_ltr">LTR Mode<input id="plus_ltr_checkbox" class="jic-checkbox" type="checkbox"></span>
<span class="dropdown__Option" id="plus_override_user_bg">Custom BG Color<input id="plus_override_user_bg_checkbox" class="jic-checkbox" type="checkbox"></span>

<span class="dropdown__Option sub_plus" id="plus_user_bgcolor">
<span style="">Background Color</span>
<input type="color" name="colorpicker" value="#000000" onchange="Button_Action('apply_bgcolors')" id="plus_clear_user_bgcolorsrc" style="opacity: 1;cursor: pointer; width: 20px;height:20px;border-radius: 2px;padding: 0px;"/>
</span>


<span class="dropdown__Option" id="plus_trans_chat">Transparent Chat<input id="plus_trans_chat_checkbox" class="jic-checkbox" type="checkbox"></span>
<span class="dropdown__Option" id="plus_trans_users">Transparent Users<input id="plus_trans_users_checkbox" class="jic-checkbox" type="checkbox"></span>
<span class="dropdown__Option" id="plus_user_bg">Background Images<input id="plus_user_bg_checkbox" class="jic-checkbox" type="checkbox"></span>

</div>

`
  option_box.appendChild(theme_menu)
}

// ------------------------------------ CREATE : BG IMAGE SETTINGS -----------------------------*/
function Create_BG_Settings () {
  var option_box = document.getElementById("PlusOptions_Box")
  var theme_menu = document.createElement("div")
  theme_menu.className = "dropdown__Options"
  theme_menu.setAttribute("id", "plus_bg_settings")
  theme_menu.setAttribute("style", "margin-top:5px;")
  theme_menu.innerHTML = `
<style>
.open_plus_theme.user_bg #plus_bg_settings {
display:block;
}

#plus_bg_settings {
display:none;

}

</style>
<div class="dropdown__Option dropdown__Option-header">BG Image Settings</div>

<span class="dropdown__Option no_hoverbg">
<i class="fas fa-video" style="color:#5a6370;"></i>
<span style="position: relative; left: -34px;">CAM BG Image URL</span>
</span>

<span class="dropdown__Option no_hover">
<input id="plus_cambg_settings" title="Cam BG Settings" type="button" value="⚙" style="cursor:pointer;background: #5a6370;color: #fff;border:0px;border-radius: 10px;width: 15%;border: 0px; border-top-right-radius:0px; border-bottom-right-radius:0px;"/>
<input type='text' name="server" id="plus_clear_cambg" placeholder="URL to image.." style="opacity: 1;cursor: pointer; width: 130px;border-radius: 2px;border: 1px solid #ccc;"/>
<input id="plus_clear_cam" title="Clear Cam BG"type="button" value="✘" style="cursor:pointer;background: #5a6370;color: #fff;border:0px;border-radius: 10px;width: 15%;border: 0px; border-top-left-radius:0px; border-bottom-left-radius:0px;"/>
</span>

<div id="cambg_settings">
<span class="dropdown__Option" id="plus_cambg_cover">Cover Screen<input id="plus_cambg_cover_checkbox" class="jic-checkbox" type="checkbox" style="cursor:pointer;"></span>
<span class="dropdown__Option" id="plus_cambg_center">Center Image<input id="plus_cambg_center_checkbox" class="jic-checkbox" type="checkbox" style="cursor:pointer;"></span>
<span class="dropdown__Option" id="plus_cambg_repeat">Disable Repeat<input id="plus_cambg_repeat_checkbox" class="jic-checkbox" type="checkbox" style="cursor:pointer;"></span>
</div>

<span class="dropdown__Option no_hoverbg">
<i class="fas fa-comments" style="color:#5a6370;"></i>
<span style="position: relative; left: -28px;">CHAT BG Image URL</span>
</span>

<span class="dropdown__Option no_hover">
<input id="plus_chatbg_settings" title="Chat BG Settings" type="button" value="⚙" style="cursor:pointer;background: #5a6370;color: #fff;border:0px;border-radius: 10px;width: 15%;border: 0px; border-top-right-radius:0px; border-bottom-right-radius:0px;"/>
<input type='text' name="server" id="plus_clear_chatbg" placeholder="URL to image.." style="opacity: 1;cursor: pointer; width: 130px;border-radius: 2px;border: 1px solid #ccc;"/>
<input id="plus_clear_chat" title="Clear Chat BG" type="button" value="✘" style="cursor:pointer;background: #5a6370;color: #fff;border:0px;border-radius: 10px;width: 15%;border: 0px; border-top-left-radius:0px; border-bottom-left-radius:0px;"/>
</span>

<div id="chatbg_settings">
<span class="dropdown__Option" id="plus_chatbg_cover">Cover Screen<input id="plus_chatbg_cover_checkbox" class="jic-checkbox" type="checkbox" style="cursor:pointer;"></span>
<span class="dropdown__Option" id="plus_chatbg_center">Center Image<input id="plus_chatbg_center_checkbox" class="jic-checkbox" type="checkbox" style="cursor:pointer;"></span>
<span class="dropdown__Option" id="plus_chatbg_repeat">Disable Repeat<input id="plus_chatbg_repeat_checkbox" class="jic-checkbox" type="checkbox" style="cursor:pointer;"></span>
</div>

<span class="dropdown__Option no_hoverbg">
<i class="fas fa-users" style="color:#5a6370;"></i>
<span style="position: relative; left: -19px;">USERS BG Image URL</span>
</span>

<span class="dropdown__Option no_hover">
<input id="plus_userbg_settings" title="User BG Settings" type="button" value="⚙" style="cursor:pointer;background: #5a6370;color: #fff;border:0px;border-radius: 10px;width: 15%;border: 0px; border-top-right-radius:0px; border-bottom-right-radius:0px;"/>
<input type='text' name="server" id="plus_clear_userbg" placeholder="URL to image.." style="opacity: 1;cursor: pointer; width: 130px;border-radius: 2px;border: 1px solid #ccc;"/>
<input id="plus_clear_user" title="Clear User BG" type="button" value="✘" style="cursor:pointer;background: #5a6370;color: #fff;border:0px;border-radius: 10px;width: 15%;border: 0px; border-top-left-radius:0px; border-bottom-left-radius:0px;"/>
</span>

<div id="userbg_settings">
<span class="dropdown__Option" id="plus_userbg_cover">Cover Screen<input id="plus_userbg_cover_checkbox" class="jic-checkbox" type="checkbox" style="cursor:pointer;"></span>
<span class="dropdown__Option" id="plus_userbg_center">Center Image<input id="plus_userbg_center_checkbox" class="jic-checkbox" type="checkbox" style="cursor:pointer;"></span>
<span class="dropdown__Option" id="plus_userbg_repeat">Disable Repeat<input id="plus_userbg_repeat_checkbox" class="jic-checkbox" type="checkbox" style="cursor:pointer;"></span>
</div>

<span class="dropdown__Option no_hoverbg">
<input id="plus_apply_images" type="button" value="✔ Apply Images" style="cursor:pointer;background: #5a6370; color: #fff; border:0px; border-radius: 10px;width: 100%;"/>
</span>

`
  option_box.appendChild(theme_menu)
}

// ------------------------------------ CREATE : BOTTOM ICONS -------------------------------*/
function Create_Bottom_Icons () {
  var bottom_bar = document.getElementById("bottom_bar")
  var buttom_btns = document.createElement("div")
  buttom_btns.className = ""
  buttom_btns.setAttribute("id", "plus_btm_bar")
  buttom_btns.setAttribute("title", "plus_btm_bar")
  buttom_btns.innerHTML = `
<label class="button chat__HeaderOption PlusOption_poprestore" id="plus_poprestore" title="Restore PopChat" style="display:none">
<i class="fas fa-window-restore"></i>
</label>

<label class="button chat__HeaderOption PlusOption_miniyt" id="plus_miniyt" title="Mini Youtube Player">
<i class="fa fa-compress-arrows-alt"></i>
</label>

<label class="button chat__HeaderOption" id="plus_web" title="Plus Browse">
<i class="fas fa-location-arrow"></i>
</label>

<div class="plus_web" id="plus_window">
<label class="button chat__HeaderOption" id="plus_hideweb" title="Exit Window Mode">
<i class="fas fa-sign-out-alt"></i>
</label>

<label class="button chat__HeaderOption" id="plus_games" title="Mini Game Window">
<i class="fas fa-gamepad"></i>
</label>

<label class="button chat__HeaderOption" id="plus_tiny" title="Youtube Back Up">
<i class="fab fa-youtube"></i>
</label>

</div>
`
  bottom_bar.appendChild(buttom_btns)
  bottom_bar.insertBefore(buttom_btns, null)
  bottom_bar.insertBefore(
    buttom_btns,
    bottom_bar.childNodes[3] || null
  )
}

// ------------------------------------ CREATE : TOP ICONS ----------------------------------*/
function Create_Top_Icons () {
  var top_bar = document.getElementById("chat__HeaderOptions")
  var top_btns = document.createElement("div")
  top_btns.className = ""
  top_btns.setAttribute("id", "plus_top_bar")
  top_btns.innerHTML = `
<label class="button chat__HeaderOption" id="plus_popchat">
<i class="fas fa-window-restore"></i>
</label>

<span class="settings_title" id="plus_title_popchat">Popchat</span>

<label class="button chat__HeaderOption PlusOption_chat" id="plus_chat">
<i class="fa fa-user-cog"></i>
</label>

<span class="settings_title" id="plus_title_chat">Chat Settings</span>

<label class="button chat__HeaderOption" id="plus_cam">
<i class="fa fa-th-large"></i>
</label>

<span class="settings_title" id="plus_title_cam">Cam Settings</span>

<label class="button chat__HeaderOption" id="plus_theme">
<i class="fa fa-palette"></i>
</label>

<span class="settings_title" id="plus_title_theme">Theme Settings</span>
`
  top_bar.appendChild(top_btns)
  top_bar.insertBefore(top_btns, null)
  top_bar.insertBefore(
    top_btns,
    top_bar.childNodes[3] || null
  )
}

// ------------------------------------ CREATE : PLUS INFO BUTTON --------------------------*/
function Create_Plus_Info () {
  var info_box = document.getElementById("info_box")
  var info_btns = document.createElement("label")
  info_btns.className
    = "button button-floating button-icon button--text roomHeader__UserAction PlusOption_chat"
  info_btns.setAttribute("id", "plus_notice")
  info_btns.setAttribute("style", "z-index:2000")
  info_btns.setAttribute("title", "Whats New SmokeyPlus")
  info_btns.innerHTML = `
<img src="https://cdn.jsdelivr.net/gh/SmokeyPlus/JumpinPlus@9ada4fbd26a289f24d0416136e05ae449c748437/images/plusicon.png" width="20px">
<span class="mobileHidden" id="">Plus Info</span>
`
  info_box.appendChild(info_btns)
  info_box.insertBefore(info_btns, null)
  info_box.insertBefore(info_btns, info_box.childNodes[0] || null)
  Create_Plus_Notice()
}

// ------------------------------------ CREATE : PLUS INFO POPUP ---------------------------*/
function Create_Plus_Notice () {
  var Plus_Notice = document.createElement("div")
  Plus_Notice.innerHTML = `
<div id="notice_info">
<label style="cursor:pointer;">
<div class="theme_alert_notice">

<iframe id="HW_JL_frame" src="" sandbox="allow-same-origin allow-scripts allow-top-navigation allow-popups allow-forms allow-popups-to-escape-sandbox" tabindex="0" aria-hidden="false" style="height:330px;width:345px;"></iframe>
<br>
<div class="info_footer"><center><small>Script Last Updated: 12/28/19</small>
<br>
<a href="https://www.smokeyplus.com/" style="color:gray;text-decoration:none;" target="_blank">Smokeyplus.com</a></div>
</div>
</label>
</div>`
  Plus_Notice.setAttribute("id", "plus_notice_settings")
  document.body.appendChild(Plus_Notice)
}

// ------------------------------------ CREATE : HEADER HIDER -------------------------------*/
function Create_Header_Hider () {
  var info_box = document.getElementById("info_box")
  var HeaderHideBtn = document.createElement("label")
  HeaderHideBtn.className = "PlusOption_chat"
  HeaderHideBtn.setAttribute("id", "plus_hide_header")
  HeaderHideBtn.setAttribute("title", "Hide Header")
  HeaderHideBtn.innerHTML = `
<span id="header_hide_icon"><i class="fas fa-chevron-up" id="header_up"></i><i class="fas fa-chevron-down" id="header_down"></i></span>
`
  info_box.appendChild(HeaderHideBtn)
  info_box.insertBefore(HeaderHideBtn, null)
  info_box.insertBefore(HeaderHideBtn, info_box.childNodes[0] || null)
}

// ------------------------------------ ACTION : TOGGLE THEME CHOICE ------------------------*/
function Toggle_Theme (color) {
  var thememode_variable = "thememode"
  body.classList.add("thememode")

  var plus_theme_bgcolor
  var plus_theme_bordercolor
  var plus_theme_lightbgcolor
  var plus_theme_textcolor
  var plus_theme_buttontext
  var plus_theme_userlist
  var plus_theme_cambg = ""
  var plus_theme_userbg = ""
  var plus_theme_chatheaderbg = ""
  var plus_theme_chatbg = ""
  var plus_theme_messagebg = ""

  if (color !== "tech") {
    body.classList.remove("tech")
  }

  if (color === "custom") {
    var current_status = localStorage.getItem("thememode")
    if (current_status === "custom") {
      Toggle_Theme("default")
      Toggle_Custom_Box("off")
      localStorage.removeItem("thememode")
    } else {
      Save_Plus_Color("custom")
      Toggle_Custom_Box("on")
    }
  } else {
    if (color === "default") {
      body.classList.remove("thememode")
      localStorage.removeItem("thememode")
      document.documentElement.style.setProperty("--thememode-bgcolor", "")
      document.documentElement.style.setProperty("--thememode-bordercolor", "")
      document.documentElement.style.setProperty("--thememode-lightbgcolor", "")
      document.documentElement.style.setProperty("--thememode-textcolor", "")
      document.documentElement.style.setProperty("--thememode-buttontext", "")
      document.documentElement.style.setProperty("--thememode-userlist", "")

      document.documentElement.style.setProperty("--thememode-roombg", "")
      document.documentElement.style.setProperty("--thememode-userbg", "")
      document.documentElement.style.setProperty("--thememode-chatheaderbg", "")
      document.documentElement.style.setProperty("--thememode-chatbg", "")
      document.documentElement.style.setProperty("--thememode-messagebg", "")
    }
    document.documentElement.style.setProperty(
      "--thememode-bgcolor",
      plus_theme_bgcolor
    )
    document.documentElement.style.setProperty(
      "--thememode-bordercolor",
      plus_theme_bordercolor
    )
    document.documentElement.style.setProperty(
      "--thememode-lightbgcolor",
      plus_theme_lightbgcolor
    )
    document.documentElement.style.setProperty(
      "--thememode-textcolor",
      plus_theme_textcolor
    )
    document.documentElement.style.setProperty(
      "--thememode-buttontext",
      plus_theme_buttontext
    )

    document.documentElement.style.setProperty(
      "--thememode-roombg",
      plus_theme_cambg
    )
    document.documentElement.style.setProperty(
      "--thememode-userbg",
      plus_theme_userbg
    )
    document.documentElement.style.setProperty(
      "--thememode-chatheaderbg",
      plus_theme_chatheaderbg
    )
    document.documentElement.style.setProperty(
      "--thememode-chatbg",
      plus_theme_chatbg
    )
    document.documentElement.style.setProperty(
      "--thememode-messagebg",
      plus_theme_messagebg
    )
    document.documentElement.style.setProperty(
      "--thememode-userlist",
      plus_theme_userlist
    )
  }
  if (theme_status !== color) {
    localStorage.setItem(thememode_variable, color)
  }
}

