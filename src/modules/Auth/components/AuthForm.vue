<template>
  <form class="pt-4" @submit.prevent="emit('submit')">
    <template v-for="form in props.forms" :key="form.id">
      <div class="flex flex-col gap-1.5 mb-4">
        <div class="flex justify-between">
          <BaseLabel :for="form.id">{{ form.title }}</BaseLabel>
        </div>
        <div class="relative">
          <BaseInput
            v-model="formSubmit[form.id]"
            :id="form.id"
            :type="form.type"
            :placeholder="form.placeholder"
            :class="focusError(props.errors[form.id])"
            @input="emit('clear-error', form.id)"
          />
          <span class="absolute right-3 top-1">
            <BaseButton
              v-if="showEye(form.id)"
              @click="emit('toggle-password', form.id)"
              type="button"
              variant="ghost"
              size="icon"
            >
              <img :src="eyeIcon" alt="" />
            </BaseButton>
          </span>
        </div>
        <span v-if="props.errors" class="text-red-500 text-xs leading-5 tracking-normal">{{
          props.errors[form.id]
        }}</span>
      </div>
    </template>
    <div class="flex justify-between pb-5"><slot /></div>
    <div class="w-full">
      <BaseButton :disabled="loading" type="submit" variant="primary">{{ props.submit }}</BaseButton>
    </div>
  </form>
</template>

<script setup>
import { BaseButton, BaseInput, BaseLabel } from "@/shared/ui/components";
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
  },
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
