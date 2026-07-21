<template>
  <form class="pt-4">
    <template v-for="form in forms" :key="form">
      <div class="flex flex-col gap-1.5 mb-4">
        <div class="flex justify-between">
          <Label :for="form.id">{{ form.title }}</Label>
        </div>
        <div class="relative">
          <Input :id="form.id" :type="form.type" :placeholder="form.placeholder" />
        </div>
      </div>
    </template>
    <div class="flex justify-between pb-5"><slot /></div>
    <Button type="submit" class="text-white rounded-xl bg-primary">{{ props.submit }}</Button>
  </form>
</template>

<script setup>
import Button from "@/shared/ui/components/Button.vue";
import Input from "@/shared/ui/components/Input.vue";
import Label from "@/shared/ui/components/Label.vue";

const props = defineProps({
  forms: {
    type: Array,
    default: () => [],
  },
  submit: {
    type: String,
    default: "",
  },
});
</script>
