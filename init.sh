#!/bin/bash

read -p "Enter file name: " filename
filepath="src/content/blog/$filename"

content=$(cat <<EOF
---
title: ""
description: ""
date: ""
---

import Link from "../../components/Link.vue"
import Code from "../../components/Code.vue"
import { createHeading } from "../../components/Heading"

export const components = {
  a: Link,
  code: Code,
  h1: createHeading("h1"),
  h2: createHeading("h2"),
  h3: createHeading("h3"),
}
EOF
)

echo "$content" > "$filepath"

echo "File created successfully at $filepath"
