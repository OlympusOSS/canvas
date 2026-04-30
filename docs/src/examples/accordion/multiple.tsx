import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<Accordion type="multiple" className="w-full">
				<AccordionItem value="overview">
					<AccordionTrigger>Overview</AccordionTrigger>
					<AccordionContent>The big picture goes here.</AccordionContent>
				</AccordionItem>
				<AccordionItem value="details">
					<AccordionTrigger>Details</AccordionTrigger>
					<AccordionContent>Drill into specifics.</AccordionContent>
				</AccordionItem>
				<AccordionItem value="references">
					<AccordionTrigger>References</AccordionTrigger>
					<AccordionContent>External links and citations.</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
}
