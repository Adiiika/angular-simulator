import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface IOffer {
    id: number;
    icon: string | IconDefinition;
    title: string;
    description: string;
}