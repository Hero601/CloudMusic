import Vue from 'vue'
import {
  Button,
  Header,
  Form,
  FormItem,
  Input,
  Badge,
  Dialog,
  Carousel,
  CarouselItem,
  Message,
  Divider,
  Tabs,
  TabPane,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Menu,
  Submenu,
  MenuItem,
  Table,
  TableColumn
} from 'element-ui'

Vue.prototype.$message = Message

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(MenuItem)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(Button)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Header)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Badge)
Vue.use(Dialog)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Divider)
Vue.use(Tabs)
Vue.use(TabPane)
