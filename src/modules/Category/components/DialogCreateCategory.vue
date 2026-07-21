<script setup lang="ts">
import { Dialog, DialogContent, DialogHeader } from "@/shared/ui/components/dialog";
import Input from "@/shared/ui/components/Input.vue";
import Label from "@/shared/ui/components/Label.vue";
import Select from "@/shared/ui/components/Select.vue";
</script>

<template>
  <Dialog class="max-w-lg">
    <DialogHeader>
      <h2 class="text-2xl">Create category</h2>
    </DialogHeader>

    <form>
      <DialogContent>
        <div class="flex flex-col gap-1.5 mb-4">
          <div class="flex justify-between">
            <Label for=""> Category name </Label>
          </div>

          <Input />
        </div>
        <div class="flex flex-col gap-1.5 mb-4">
          <div class="flex justify-between">
            <Label for=""> Type </Label>
          </div>

          <Select />
        </div>
      </DialogContent>
    </form>
  </Dialog>
</template>
