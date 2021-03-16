import { defineComponent, onMounted, reactive, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import "./style.scss";

const errorPage = defineComponent({
    props: {
        oops: {
            type: String
        },
        headline: String,
        info: String,
        btn: String,
        errorImages: String
    },

    setup(props) {
        const router = useRouter();
        // 数据初始化
        const data = reactive({
            jumpTime: 5,
            oops: props.oops,
            headline: props.headline,
            info: props.info,
            btn: props.btn,
            errorImages: props.errorImages,
            timer: undefined
        });
        // 倒计时器 及处理函数；
        let timer: any = null;

        const timeChange = () => {
            timer = setInterval(() => {
                if (data.jumpTime) {
                    data.jumpTime--;
                } else {
                    router.push({ path: "/" });
                    clearInterval(timer);
                }
            }, 1000);
        };
        const backClick = () => {
            router.push({ path: "/" });
        };
        // start Interval
        onMounted(() => {
            timeChange();
        });
        // clear Interval
        onBeforeUnmount(() => {
            clearInterval(timer);
        });
        // 加载图片
        const errorCloudImages = require("@/assets/error_images/cloud.png");
        return () => (
            <>
                <div class="error-container">
                    <div class="error-content">
                        <el-row gutter={20}>
                            <el-col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <div class="pic-error">
                                    <img
                                        alt="401"
                                        class="pic-error-parent"
                                        src={data.errorImages}
                                    />
                                    <img
                                        alt="401"
                                        class="pic-error-child left"
                                        src={errorCloudImages}
                                    />
                                    <img
                                        alt="401"
                                        class="pic-error-child"
                                        src={errorCloudImages}
                                    />
                                    <img
                                        alt="401"
                                        class="pic-error-child"
                                        src={errorCloudImages}
                                    />
                                </div>
                            </el-col>

                            <el-col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <div class="bullshit">
                                    <div class="bullshit-oops">{data.oops}</div>
                                    <div class="bullshit-headline">
                                        {data.headline}
                                    </div>
                                    <div class="bullshit-info">{data.info}</div>
                                    <a
                                        class="bullshit-return-home"
                                        onClick={backClick}>
                                        {data.jumpTime}s&nbsp;{data.btn}
                                    </a>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </>
        );
    }
});
export default errorPage;
