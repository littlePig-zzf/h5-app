import { shallowMount } from "@vue/test-utils";
import BottomBar from "@/components/BottomBar.vue";

describe("BottomBar.vue", () => {
  it("renders props.msg when passed", () => {
    // const msg = 1;
    const wrapper = shallowMount(BottomBar);
    wrapper.vm.bottomIndex = 1;
    // expect(wrapper.text()).toMatch(msg);
  });
});
