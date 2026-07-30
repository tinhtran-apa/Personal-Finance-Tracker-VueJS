<template>
  <form class="pt-4" @submit.prevent="emit('submit')">
    <template v-for="form in props.forms" :key="form.id">
      <div class="flex flex-col gap-1.5 mb-4">
        <div class="flex justify-between">
          <Label :for="form.id">{{ form.title }}</Label>
        </div>
        <div class="relative">
          <Input
            v-model="formSubmit[form.id]"
            :id="form.id"
            :type="form.type"
            :placeholder="form.placeholder"
            :class="focusError(props.errors[form.id])"
            @input="emit('clear-error', form.id)"
          />
          <button
            v-if="showEye(form.id)"
            @click="emit('toggle-password', form.id)"
            type="button"
            class="absolute right-3 top-[10.5px] bg-transparent border-0"
          >
            <img :src="eyeIcon" alt="" />
          </button>
        </div>
        <span v-if="props.errors" class="text-red-500 text-xs leading-5 tracking-normal">{{
          props.errors[form.id]
        }}</span>
      </div>
    </template>
    <div class="flex justify-between pb-5"><slot /></div>
    <Button :disabled="loading" type="submit" class="text-white rounded-xl bg-primary">{{ props.submit }}</Button>
  </form>
</template>

<script setup>
import Button from "@/shared/ui/components/Button.vue";
import Input from "@/shared/ui/components/Input.vue";
import Label from "@/shared/ui/components/Label.vue";
import eyeIcon from "@/shared/assets/icons/eye.svg";

const props = defineProps({
  forms: {
    type: Array,
    default: () => [],
  },
  submit: {
    type: String,
    default: "",
  },
  errors: {
    type: Object,
    default: () => {},
  },
  loading: {
    type: Boolean,
    default: false,
  }
});

const emit = defineEmits(["submit", "clear-error", "toggle-password"]);

const formSubmit = defineModel({
  type: Object,
  default: () => ({}),
});

const focusError = (field) => {
  return field ? "border-red-500 focus:border-red-500 focus:outline-none" : "";
};

const showEye = (field) => {
  return field === "password" || field === "confirmPassword" ? true : false;
};
</script>
