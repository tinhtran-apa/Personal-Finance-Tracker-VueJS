<template>
  <Dialog :open="props.open" class="max-w-lg">
    <DialogHeader>
      <h2 class="text-2xl">{{ props.title }}</h2>
    </DialogHeader>

    <form @submit.prevent="emit('submit')">
      <DialogContent>
        <div class="flex flex-col gap-1.5 mb-4">
          <div class="flex justify-between">
            <Label for="name"> Category name </Label>
          </div>

          <div class="relative">
            <Input v-model="forms.name" id="name" placeholder="Add name category" class="pr-3 pl-8" />
            <img :src="stack" alt="" class="absolute top-1.5 left-1.5" />
          </div>
        </div>
        <div class="flex flex-col gap-1.5 mb-4">
          <div class="flex justify-between">
            <Label for="type"> Type </Label>
          </div>

          <div class="flex rounded-md bg-link p-1 gap-2">
            <Button
              @click="forms.type = 'EXPENSE'"
              :class="forms.type === 'EXPENSE' ? 'bg-white shadow' : 'bg-neutral-200'"
              class="flex-1 rounded-md py-2"
              type="button"
            >
              Expense
            </Button>

            <Button
              @click="forms.type = 'INCOME'"
              :class="forms.type === 'INCOME' ? 'bg-white shadow' : 'bg-neutral-200'"
              class="flex-1 rounded-md py-2"
              type="button"
            >
              Income
            </Button>
          </div>
        </div>
      </DialogContent>
      <DialogFooter>
        <Button @click="emit('close-dialog')" class="w-fit border-neutral-400 border" type="button">Cancel</Button>
        <Button class="w-fit bg-primary text-white">Confirm</Button>
      </DialogFooter>
    </form>
  </Dialog>
</template>

<script setup>
import Button from "@/shared/ui/components/Button.vue";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "@/shared/ui/components/dialog";
import Input from "@/shared/ui/components/Input.vue";
import Label from "@/shared/ui/components/Label.vue";
import { ref, watch, watchEffect } from "vue";
import stack from "@/shared/assets/icons/stack.svg";

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
});

const forms = defineModel({
  type: Object,
  default: () => {},
});

const emit = defineEmits(["close-dialog", "submit"]);
</script>
