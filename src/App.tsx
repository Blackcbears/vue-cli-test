import { defineComponent } from "vue";

const App = defineComponent({
  setup() {
    const loaderWrapper = document.getElementById("loader-wrapper");
    if (loaderWrapper) {
      document.body.removeChild(loaderWrapper);
    }

    return () => (
      <>
        <router-view />
      </>
    );
  }
});

export default App;
