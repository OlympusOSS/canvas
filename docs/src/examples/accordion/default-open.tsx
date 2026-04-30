import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<Accordion type="single" collapsible defaultValue="features" className="w-full">
				<AccordionItem value="features">
					<AccordionTrigger>Features</AccordionTrigger>
					<AccordionContent>Open by default via `defaultValue`.</AccordionContent>
				</AccordionItem>
				<AccordionItem value="pricing">
					<AccordionTrigger>Pricing</AccordionTrigger>
					<AccordionContent>Closed initially.</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
}
