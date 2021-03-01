import { defineComponent } from "vue";
import "./App.scss";

const App = defineComponent({
  setup() {
    return () => (
      <>
        <router-view />
      </>
    );
  }
});

export default App;
